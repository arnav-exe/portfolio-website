<script>
	import { onMount, afterUpdate } from 'svelte';
	import { gsap } from 'gsap';

	import Cursor from '../../lib/components/Cursor.svelte';
	import NavSwitch from '../../lib/components/NavSwitch.svelte';
	import HomeLogo from '../../lib/components/HomeLogo.svelte';
	import PageLink from '../../lib/components/PageLink.svelte';
	import { streamChat } from '$lib/utils/chat.js';
	import { DEV_MODE } from '$lib/utils/env.js';

	const questionBanks = {
		projects: [
			'What have you built recently?',
			'How does this chatbot actually work?',
			'Why does your server live 4000 miles away?',
			'Ever contributed to open source?',
			'What do you run on your Raspberry Pi?',
			'What do you write about on your blog?'
		],
		work: [
			'Any experience with AWS?',
			'What do you do at Viavi?',
			'What was your dissertation about?',
			'Do you have experience with traditional ML?',
			'How do you keep LLM apps safe?',
			'What did you study at St Andrews?'
		],
		personal: [
			'What do you do outside of work?',
			'What is your Vim setup?',
			'Do you play any sports?',
			'What is your favourite ice cream flavour?',
			'What are you reading right now?'
		]
	};
	const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
	const suggestions = [
		pick(questionBanks.projects),
		pick(questionBanks.work),
		pick(questionBanks.personal)
	];

	const OFFLINE_MESSAGE =
		'The chatbot seems to be unreachable right now. Give it a minute and try again.';
	// the stream ended cleanly but carried no answer text (a finish-only turn)
	const EMPTY_MESSAGE = "I couldn't put an answer together. Try rephrasing the question?";

	// dev-mode display names for the telemetry steps (kinds come from agent-dev)
	const STEP_TITLES = {
		guardrail: 'Checked the message',
		decide: 'Decided to search',
		search: 'Searched the knowledge base',
		answer: 'Wrote the answer'
	};

	// what the visitor sees while the agent works, before the first token.
	// `thinking` is set client-side at send; the other stages arrive as SSE
	// status frames from the agent (searching also carries the tool query).
	const STATUS_LABELS = {
		thinking: 'thinking…',
		searching: 'searching the knowledge base…',
		composing: 'composing…'
	};

	function statusLabel(status) {
		if (status.stage === 'searching' && status.query) return `searching “${status.query}”…`;
		return STATUS_LABELS[status.stage] ?? 'working…';
	}

	let messages = [];
	let draft = '';
	let streaming = false;
	let sessionId = null;
	let bottomEl;

	const now = () =>
		new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

	// minimal inline rendering for the two marks the bot actually uses:
	// `code` and **bold**. Everything is HTML-escaped first, so {@html} is safe.
	const renderInline = (text) =>
		text
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replace(/`([^`\n]+)`/g, '<code class="chat-code">$1</code>')
			.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');

	//  dev-mode formatting helpers
	const stepSub = (step) => {
		if (step.kind === 'guardrail') return 'Haiku, for injection and abuse';
		if (step.kind === 'search') return 'embedding + keywords local · rerank Cohere';
		return /claude|anthropic/i.test(step.model || '')
			? 'chat model, claude fallback'
			: 'chat model, local';
	};

	const fmtSecs = (s) =>
		s == null
			? '—'
			: s >= 60
				? `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`
				: `${s.toFixed(1)}s`;

	const fmtTok = (n) => (n == null ? '—' : n.toLocaleString('en-GB'));

	const fmtCost = (c) => (c == null ? '—' : c === 0 ? '$0' : `$${c.toFixed(4)}`);

	const ctxBar = (used, limit) => {
		const pct = limit && used != null ? Math.min(1, used / limit) : 0;
		const filled = Math.min(10, Math.round(pct * 10));
		return {
			filled: '█'.repeat(filled),
			empty: '█'.repeat(10 - filled),
			pct: Math.round(pct * 100)
		};
	};

	const timeSegments = (dev) => {
		const total = dev.turn?.seconds;
		if (!total) return [];
		let elapsed = 0;
		return dev.steps.map((step) => {
			const seg = {
				left: (elapsed / total) * 100,
				width: Math.max(0.8, (step.seconds / total) * 100),
				paid: (step.cost ?? 0) > 0,
				title: `${STEP_TITLES[step.kind] ?? step.kind} · ${fmtSecs(step.seconds)}`
			};
			elapsed += step.seconds;
			return seg;
		});
	};

	const turnChunks = (m) => m.receipts.reduce((sum, r) => sum + (r.chunks ?? 0), 0);

	$: convoTotals = DEV_MODE
		? messages.reduce(
				(acc, m) => {
					if (m.dev?.turn) {
						acc.turns += 1;
						acc.tokens += (m.dev.turn.tokens_in ?? 0) + (m.dev.turn.tokens_out ?? 0);
						acc.cost += m.dev.turn.cost ?? 0;
					}
					return acc;
				},
				{ turns: 0, tokens: 0, cost: 0 }
			)
		: null;

	onMount(() => {
		try {
			sessionId = sessionStorage.getItem('chat-session-id');
		} catch {
			sessionId = null;
		}

		gsap.fromTo(
			'.chat-reveal',
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }
		);
	});

	afterUpdate(() => {
		if (streaming) bottomEl?.scrollIntoView({ block: 'end' });
	});

	async function send(text) {
		const question = (text ?? draft).trim();
		if (!question || streaming) return;

		draft = '';
		streaming = true;
		messages = [...messages, { role: 'visitor', text: question, time: now(), receipts: [] }];
		const reply = {
			role: 'arnav',
			text: '',
			time: now(),
			receipts: [],
			// shown in place of the empty answer until the first token; see STATUS_LABELS
			status: { stage: 'thinking' },
			dev: DEV_MODE ? { steps: [], turn: null, ttftBrowser: null, open: false } : null
		};
		messages = [...messages, reply];
		const sentAt = performance.now();

		try {
			const finished = await streamChat({
				message: question,
				sessionId,
				onMeta: (meta) => {
					sessionId = meta.session_id;
					try {
						sessionStorage.setItem('chat-session-id', sessionId);
					} catch {
						// private windows etc - a fresh session per message is fine
					}
				},
				onReceipt: (receipt) => {
					reply.receipts = [...reply.receipts, receipt];
					// a receipt means the search is over, so advance the label even
					// if the agent is an older build that sends no status frames
					reply.status = { stage: 'composing' };
					messages = messages;
				},
				onStatus: (status) => {
					reply.status = status;
					messages = messages;
				},
				onDelta: (chunk) => {
					if (reply.dev && reply.dev.ttftBrowser == null) {
						reply.dev.ttftBrowser = (performance.now() - sentAt) / 1000;
					}
					// the model tends to open with blank lines; drop them so the
					// answer starts flush under its eyebrow
					reply.text = reply.text ? reply.text + chunk : chunk.replace(/^\s+/, '');
					messages = messages;
				},
				onStep: (step) => {
					if (reply.dev) {
						reply.dev.steps = [...reply.dev.steps, step];
						messages = messages;
					}
				},
				onTurn: (turn) => {
					if (reply.dev) {
						reply.dev.turn = turn;
						messages = messages;
					}
				},
				onError: (message) => {
					if (!reply.text) reply.text = message;
				}
			});
			if (!reply.text) reply.text = finished ? EMPTY_MESSAGE : OFFLINE_MESSAGE;
		} catch {
			if (!reply.text) reply.text = OFFLINE_MESSAGE;
		}

		// whatever ended the stream, the status line goes with it
		reply.status = null;
		messages = messages;
		streaming = false;
	}
</script>

<svelte:head>
	<title>Chat | Arnav Jagetia</title>
	<meta
		name="description"
		content="Ask an AI trained on Arnav Jagetia's projects, blog, and experience anything about his work."
	/>
</svelte:head>

<!-- custom cursor -->
<Cursor />

<div class="p-8 space-y-8">
	<div class="relative z-40 flex justify-center items-center h-full mx-auto">
		<HomeLogo />
		<div class="absolute right-0">
			<NavSwitch active={2} />
		</div>
	</div>

	<div class="mx-auto w-[90%] {DEV_MODE ? 'max-w-6xl' : 'max-w-3xl'} min-h-[70vh] flex flex-col">
		{#if messages.length === 0}
			<!-- empty state -->
			<div class="flex-1 flex flex-col justify-center text-center py-16 mx-auto w-full max-w-3xl">
				<h1
					class="chat-reveal h2 font-bold flex items-center gap-8 whitespace-nowrap
					before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15
					after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15"
				>
					ASK ME ANYTHING
				</h1>
				<p class="chat-reveal mt-5 text-sm dark:text-primary-900">
					An AI with my voice, my projects, and my opinions on tab width.
				</p>
				<div class="chat-reveal mt-10 flex flex-wrap justify-center gap-3">
					{#each suggestions as suggestion}
						<button
							class="px-4 py-2 rounded-full border border-primary-500/20 dark:text-primary-700
							hover:border-primary-500/50 hover:dark:text-primary-500 transition-colors duration-150 text-sm"
							on:click={() => send(suggestion)}
						>
							{suggestion}
						</button>
					{/each}
				</div>
			</div>
		{:else}
			<!-- transcript -->
			<div class="flex-1" data-cursor-static>
				{#if DEV_MODE && convoTotals}
					<div class="dev-grid">
						<div />
						<aside class="dev-margin border-b border-primary-500/10 pb-3 mb-2">
							<div class="dev-head">This conversation</div>
							<div>
								<span class="dev-lbl">turns</span><span class="dev-v">{convoTotals.turns}</span>
							</div>
							<div>
								<span class="dev-lbl">tokens</span><span class="dev-v"
									>{fmtTok(convoTotals.tokens)}</span
								>
							</div>
							<div>
								<span class="dev-lbl">cost so far</span><span class="dev-paid"
									>{fmtCost(convoTotals.cost)}</span
								>
							</div>
						</aside>
					</div>
				{/if}
				{#each messages as m, i}
					<div
						class="py-5 border-t border-primary-500/10 first:border-t-0 {DEV_MODE
							? 'dev-grid'
							: ''}"
					>
						<div>
							<div class="flex items-baseline gap-4 mb-2">
								<span
									class="text-[10.5px] tracking-[0.22em] uppercase
									{m.role === 'arnav' ? 'text-secondary-500' : 'dark:text-primary-900'}"
								>
									{m.role === 'arnav' ? 'Arnav' : 'Visitor'}
								</span>
								<span class="font-mono text-[10px] dark:text-primary-900">{m.time}</span>
							</div>
							{#if m.status && !m.text}
								<!-- pre-token status line. the live region is the stable wrapper; only the label re-keys -->
								<div class="chat-body chat-status max-w-[66ch]" role="status" aria-live="polite">
									<span class="caret" aria-hidden="true" />
									{#key m.status.stage}
										<span
											class="chat-status-label font-mono text-[11px] dark:text-primary-900 truncate max-w-[40ch]"
										>
											{statusLabel(m.status)}
										</span>
									{/key}
								</div>
							{:else}
								<p
									class="chat-body max-w-[66ch] whitespace-pre-wrap
									{m.role === 'visitor' ? 'dark:text-primary-700' : ''}"
								>
									<!-- renderInline html-escapes before adding its own tags, so this is not raw user html -->
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html renderInline(m.text)}{#if streaming && i === messages.length - 1}<span
											class="caret"
											aria-hidden="true"
										/>{/if}
								</p>
							{/if}
							{#each m.receipts as receipt}
								{#if DEV_MODE && receipt.items?.length}
									<!-- dev mode: the receipt line is the chunk dropdown -->
									<button
										class="dev-receipt font-mono text-[11px] dark:text-primary-900 mt-2 block"
										aria-expanded={receipt.open ?? false}
										on:click={() => {
											receipt.open = !receipt.open;
											messages = messages;
										}}
									>
										<span class="dev-tri" class:open={receipt.open} aria-hidden="true" />&#8627;
										searched knowledge base:
										<span class="text-tertiary-500">"{receipt.query}"</span>
										&middot; {receipt.chunks}
										{receipt.chunks === 1 ? 'chunk' : 'chunks'}{#if receipt.seconds != null}
											&middot; {receipt.seconds}s{/if}
									</button>
									{#if receipt.open}
										<div class="pl-4 mt-1">
											{#each receipt.items as item, ci}
												<div class="border-l border-primary-500/15 pl-3 my-2">
													<div class="font-mono text-[10.5px] text-tertiary-500 mb-1">
														{item.path} &middot; chunk {ci + 1} of {receipt.items.length}
													</div>
													<p
														class="text-[13px] dark:text-primary-700 max-w-[60ch] whitespace-pre-wrap"
													>
														{item.content}
													</p>
												</div>
											{/each}
										</div>
									{/if}
								{:else}
									<div class="font-mono text-[11px] dark:text-primary-900 mt-2">
										&#8627; searched knowledge base:
										<span class="text-tertiary-500">"{receipt.query}"</span>
										&middot; {receipt.chunks}
										{receipt.chunks === 1 ? 'chunk' : 'chunks'}{#if receipt.seconds != null}
											&middot; {receipt.seconds}s{/if}
									</div>
								{/if}
							{/each}
						</div>
						{#if DEV_MODE && m.role === 'arnav' && m.dev}
							<aside class="dev-margin lg:pt-1">
								<div class="dev-head">This turn &middot; {m.time}</div>
								<div>
									<span class="dev-lbl">first token</span><span class="dev-v"
										>{fmtSecs(m.dev.ttftBrowser)}</span
									>
									<span class="dev-k">
										in browser{#if m.dev.turn?.ttft_server != null}
											&middot; {fmtSecs(m.dev.turn.ttft_server)} at server{/if}</span
									>
								</div>
								{#if m.dev.turn}
									{@const bar = ctxBar(m.dev.turn.context_used, m.dev.turn.context_limit)}
									<div>
										<span class="dev-lbl">context</span><span
											class="dev-bar"
											class:warn={bar.pct >= 75}
											class:bad={bar.pct >= 90}
											><span class="f">{bar.filled}</span><span class="e">{bar.empty}</span></span
										>
										<span class="dev-v">{bar.pct}%</span>
										<span class="dev-k"
											>{fmtTok(m.dev.turn.context_used)} / {fmtTok(m.dev.turn.context_limit)}</span
										>
									</div>
									<div>
										<span class="dev-lbl">reply</span><span class="dev-v"
											>{fmtTok(m.dev.turn.reply_tokens)} tokens</span
										>
									</div>
									<div>
										<span class="dev-lbl">chunks</span><span class="dev-v">{turnChunks(m)}</span
										>{#if m.receipts.length}
											<span class="dev-k">&middot; click the receipt to read them</span>{/if}
									</div>
									<div>
										<span class="dev-lbl">total</span><span class="dev-v"
											>{fmtSecs(m.dev.turn.seconds)}</span
										>
										&middot; <span class="dev-paid">{fmtCost(m.dev.turn.cost)}</span>
									</div>
								{/if}
								{#if m.dev.steps.length}
									<button
										class="dev-expand"
										aria-expanded={m.dev.open}
										on:click={() => {
											m.dev.open = !m.dev.open;
											messages = messages;
										}}
									>
										<span class="dev-tri" class:open={m.dev.open} aria-hidden="true" />show
										breakdown
									</button>
									{#if m.dev.open}
										<div class="dev-breakdown">
											{#if m.dev.turn}
												<div class="dev-timekey">
													<span>0s</span><span>where the {fmtSecs(m.dev.turn.seconds)} went</span
													><span>{fmtSecs(m.dev.turn.seconds)}</span>
												</div>
												<div class="dev-timebar">
													{#each timeSegments(m.dev) as seg}
														<span
															class:paid={seg.paid}
															style="left:{seg.left}%;width:{seg.width}%"
															title={seg.title}
														/>
													{/each}
													{#if m.dev.turn.ttft_server != null}
														<i
															style="left:{(m.dev.turn.ttft_server / m.dev.turn.seconds) * 100}%"
															title="first token at the server · {fmtSecs(m.dev.turn.ttft_server)}"
														/>
													{/if}
												</div>
											{/if}
											<div class="dev-row dev-rowhead">
												<span>what happened</span><span>time</span><span>tokens in / out</span><span
													>cost</span
												>
											</div>
											{#each m.dev.steps as step}
												<div class="dev-row">
													<span class="dev-step"
														>{STEP_TITLES[step.kind] ?? step.kind}<small>{stepSub(step)}</small
														></span
													>
													<span class="dev-n">{fmtSecs(step.seconds)}</span>
													<span class="dev-n">
														{step.tokens_in == null
															? '—'
															: `${fmtTok(step.tokens_in)} / ${fmtTok(step.tokens_out)}`}
													</span>
													<span
														class="dev-n"
														class:dev-zero={step.cost === 0}
														class:dev-paid={(step.cost ?? 0) > 0}
													>
														{fmtCost(step.cost)}{#if step.estimated}<i class="dev-est">
																est.</i
															>{/if}
													</span>
												</div>
											{/each}
											{#if m.dev.turn}
												<div class="dev-row dev-total">
													<span class="dev-step">Whole turn</span>
													<span class="dev-n">{fmtSecs(m.dev.turn.seconds)}</span>
													<span class="dev-n"
														>{fmtTok(m.dev.turn.tokens_in)} / {fmtTok(m.dev.turn.tokens_out)}</span
													>
													<span class="dev-n dev-paid">{fmtCost(m.dev.turn.cost)}</span>
												</div>
											{/if}
										</div>
									{/if}
								{/if}
							</aside>
						{/if}
					</div>
				{/each}
				<div bind:this={bottomEl} />
			</div>
		{/if}

		<!-- input -->
		<form
			class="chat-reveal flex items-center gap-5 mt-8 w-full {DEV_MODE && messages.length
				? 'lg:max-w-[42rem]'
				: 'mx-auto max-w-3xl'}"
			on:submit|preventDefault={() => send()}
		>
			<input
				type="text"
				bind:value={draft}
				disabled={streaming}
				placeholder="Ask me anything…"
				maxlength="4000"
				class="flex-1 bg-transparent border-0 border-b border-primary-500/15 focus:border-primary-500/40
				focus:ring-0 px-1 py-2.5 text-lg dark:text-primary-500 placeholder:dark:text-primary-900"
			/>
			<button
				type="submit"
				disabled={streaming || !draft.trim()}
				class="px-8 py-3 border border-primary-500/30 hover:border-primary-500/60
				transition-colors duration-150 tracking-[0.2em] text-sm uppercase disabled:opacity-40
				disabled:hover:border-primary-500/30"
			>
				Send
			</button>
		</form>

		<!-- disclaimer -->
		<div
			class="chat-reveal mt-10 pt-4 border-t border-primary-500/10 text-center w-full {DEV_MODE &&
			messages.length
				? 'lg:max-w-[42rem]'
				: 'mx-auto max-w-3xl'}"
		>
			<p class="text-xs dark:text-primary-900">
				AI-generated responses may contain errors. Please verify important information.
			</p>
			<PageLink href="/graph" direction="forward" class="mt-3">
				View the knowledge graph powering this
			</PageLink>
		</div>
	</div>
</div>

<style>
	.chat-body {
		font-size: 1.125rem;
		line-height: 1.55;
	}

	.chat-body :global(.chat-code) {
		font-family: ui-monospace, monospace;
		font-size: 0.9em;
		padding: 0.1em 0.35em;
		border-radius: 0.25rem;
		background: rgb(var(--color-primary-500) / 0.08);
	}

	.caret {
		display: inline-block;
		width: 9px;
		height: 1.05em;
		margin-left: 2px;
		vertical-align: text-bottom;
		background: rgb(var(--color-tertiary-500));
	}

	/* same line box as the answer paragraph that replaces it, so the first token lands without a hop */
	.chat-status {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-height: 1.55em;
	}

	@media (prefers-reduced-motion: no-preference) {
		.caret {
			animation: blink 1.06s steps(1) infinite;
		}

		/* in the status row the caret is a heartbeat, not a cursor: breathe instead of blinking off */
		.chat-status .caret {
			animation: pulse 1.4s ease-in-out infinite;
		}

		.chat-status-label {
			animation: status-in 0.32s ease-out;
		}

		@keyframes blink {
			50% {
				opacity: 0;
			}
		}

		@keyframes pulse {
			50% {
				opacity: 0.25;
			}
		}

		@keyframes status-in {
			from {
				opacity: 0;
				transform: translateY(3px);
			}
		}
	}

	/* dev mode instrumentation */

	.dev-grid {
		display: block;
	}

	@media (min-width: 1024px) {
		.dev-grid {
			display: grid;
			grid-template-columns: minmax(0, 42rem) 1fr;
			gap: 3rem;
			align-items: start;
		}
	}

	.dev-margin {
		font-family: ui-monospace, monospace;
		font-variant-numeric: tabular-nums;
		font-size: 10.5px;
		line-height: 1.8;
		color: rgb(var(--color-primary-900));
		margin-top: 0.75rem;
	}

	@media (min-width: 1024px) {
		.dev-margin {
			margin-top: 0;
		}
	}

	.dev-head {
		font-size: 9.5px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		margin-bottom: 3px;
	}

	.dev-lbl {
		display: inline-block;
		width: 84px;
	}

	.dev-v {
		color: rgb(var(--color-primary-700));
	}

	.dev-k {
		color: rgb(var(--color-primary-900));
	}

	.dev-paid {
		color: rgb(var(--color-secondary-500));
	}

	.dev-zero {
		color: rgb(var(--color-primary-900));
	}

	.dev-est {
		font-style: italic;
		color: rgb(var(--color-primary-900));
	}

	.dev-bar {
		letter-spacing: -1px;
	}

	.dev-bar .f {
		color: rgb(var(--color-primary-700));
	}

	.dev-bar .e {
		color: rgb(var(--color-primary-500) / 0.15);
	}

	.dev-bar.warn .f {
		color: rgb(var(--color-warning-500));
	}

	.dev-bar.bad .f {
		color: rgb(var(--color-error-500));
	}

	.dev-tri {
		display: inline-block;
		width: 0;
		height: 0;
		border-left: 5px solid rgb(var(--color-primary-900));
		border-top: 4px solid transparent;
		border-bottom: 4px solid transparent;
		transition: transform 0.15s;
		margin-right: 7px;
		vertical-align: middle;
	}

	.dev-tri.open {
		transform: rotate(90deg);
	}

	.dev-receipt:hover,
	.dev-expand:hover {
		color: rgb(var(--color-primary-500));
	}

	.dev-expand {
		display: block;
		margin-top: 6px;
	}

	.dev-breakdown {
		margin-top: 8px;
		border-top: 1px solid rgb(var(--color-primary-500) / 0.08);
		padding-top: 8px;
	}

	.dev-timekey {
		display: flex;
		justify-content: space-between;
		font-size: 9px;
		margin-bottom: 4px;
	}

	.dev-timebar {
		position: relative;
		height: 6px;
		background: rgb(var(--color-primary-500) / 0.06);
		border-radius: 2px;
		margin-bottom: 10px;
	}

	.dev-timebar span {
		position: absolute;
		top: 0;
		height: 100%;
		border-radius: 2px;
		background: rgb(var(--color-primary-700));
		opacity: 0.45;
	}

	.dev-timebar span.paid {
		background: rgb(var(--color-secondary-500));
		opacity: 0.75;
	}

	.dev-timebar i {
		position: absolute;
		top: -3px;
		width: 1px;
		height: 12px;
		background: rgb(var(--color-tertiary-500));
	}

	.dev-row {
		display: grid;
		grid-template-columns: 1.5fr 0.45fr 0.75fr 0.6fr;
		gap: 10px;
		padding: 5px 0;
		border-bottom: 1px solid rgb(var(--color-primary-500) / 0.08);
		align-items: baseline;
		line-height: 1.4;
	}

	.dev-rowhead {
		font-size: 9px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.dev-rowhead span:not(:first-child) {
		text-align: right;
	}

	.dev-step {
		color: rgb(var(--color-primary-500));
	}

	.dev-step small {
		display: block;
		font-size: 9.5px;
		color: rgb(var(--color-primary-900));
	}

	.dev-n {
		color: rgb(var(--color-primary-700));
		text-align: right;
	}

	.dev-total {
		border-bottom: 0;
		padding-top: 8px;
	}

	.dev-total .dev-step,
	.dev-total .dev-n {
		color: rgb(var(--color-primary-500));
	}

	.dev-total .dev-n.dev-paid {
		color: rgb(var(--color-secondary-500));
	}
</style>
