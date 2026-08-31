<script>
	import { onMount, afterUpdate } from 'svelte';
	import { gsap } from 'gsap';

	import Cursor from '../../lib/components/Cursor.svelte';
	import NavSwitch from '../../lib/components/NavSwitch.svelte';
	import { streamChat } from '$lib/utils/chat.js';

	const suggestions = [
		'What have you built recently?',
		'Any experience with AWS?',
		'Do you actually enjoy using Vim?'
	];

	const OFFLINE_MESSAGE =
		'The chatbot seems to be unreachable right now. Give it a minute and try again.';

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
		const reply = { role: 'arnav', text: '', time: now(), receipts: [] };
		messages = [...messages, reply];

		try {
			const finished = await streamChat({
				message: question,
				sessionId,
				onMeta: (meta) => {
					sessionId = meta.session_id;
					try {
						sessionStorage.setItem('chat-session-id', sessionId);
					} catch {
						/* private windows etc. - a fresh session per message is fine */
					}
				},
				onReceipt: (receipt) => {
					reply.receipts = [...reply.receipts, receipt];
					messages = messages;
				},
				onDelta: (chunk) => {
					// the model tends to open with blank lines; drop them so the
					// answer starts flush under its eyebrow
					reply.text = reply.text ? reply.text + chunk : chunk.replace(/^\s+/, '');
					messages = messages;
				},
				onError: (message) => {
					if (!reply.text) reply.text = message;
				}
			});
			if (!finished && !reply.text) reply.text = OFFLINE_MESSAGE;
		} catch {
			if (!reply.text) reply.text = OFFLINE_MESSAGE;
		}

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
	<div class="relative z-40 flex justify-end items-center h-full mx-auto">
		<NavSwitch active={2} />
	</div>

	<div class="mx-auto w-[90%] max-w-3xl min-h-[70vh] flex flex-col">
		{#if messages.length === 0}
			<!-- empty state -->
			<div class="flex-1 flex flex-col justify-center text-center py-16">
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
				{#each messages as m, i}
					<div class="py-5 border-t border-primary-500/10 first:border-t-0">
						<div class="flex items-baseline gap-4 mb-2">
							<span
								class="text-[10.5px] tracking-[0.22em] uppercase
								{m.role === 'arnav' ? 'text-secondary-500' : 'dark:text-primary-900'}"
							>
								{m.role === 'arnav' ? 'Arnav' : 'Visitor'}
							</span>
							<span class="font-mono text-[10px] dark:text-primary-900">{m.time}</span>
						</div>
						<p
							class="chat-body max-w-[66ch] whitespace-pre-wrap
							{m.role === 'visitor' ? 'dark:text-primary-700' : ''}"
						>
							{@html renderInline(m.text)}{#if streaming && i === messages.length - 1}<span
									class="caret"
									aria-hidden="true"
								/>{/if}
						</p>
						{#each m.receipts as receipt}
							<div class="font-mono text-[11px] dark:text-primary-900 mt-2">
								&#8627; searched knowledge base:
								<span class="text-tertiary-500">"{receipt.query}"</span>
								&middot; {receipt.chunks}
								{receipt.chunks === 1 ? 'chunk' : 'chunks'}{#if receipt.seconds != null}
									&middot; {receipt.seconds}s{/if}
							</div>
						{/each}
					</div>
				{/each}
				<div bind:this={bottomEl} />
			</div>
		{/if}

		<!-- input -->
		<form class="chat-reveal flex items-center gap-5 mt-8" on:submit|preventDefault={() => send()}>
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
		<div class="chat-reveal mt-10 pt-4 border-t border-primary-500/10 text-center">
			<p class="text-xs dark:text-primary-900">
				You're talking to an AI trained on my documents. It does its best, but check anything that
				matters.
			</p>
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

	@media (prefers-reduced-motion: no-preference) {
		.caret {
			animation: blink 1.06s steps(1) infinite;
		}

		@keyframes blink {
			50% {
				opacity: 0;
			}
		}
	}
</style>
