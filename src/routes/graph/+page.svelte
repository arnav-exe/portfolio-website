<script>
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';

	import Cursor from '../../lib/components/Cursor.svelte';
	import HomeLogo from '../../lib/components/HomeLogo.svelte';
	import PageLink from '../../lib/components/PageLink.svelte';
	import { CHAT_API_BASE } from '$lib/utils/chat.js';

	const PERSON_COLOR = '#e8e7e2';
	const RAMP = ['#d4c9ae', '#b8895a', '#aeaeaa', '#8b8b87', '#9f9783'];
	const OTHER_COLOR = '#72716e';
	const LINK_COLOR = 'rgba(232, 231, 226, 0.08)';
	const LINK_HOT = 'rgba(184, 137, 90, 0.55)';
	const LABEL_COLOR = 'rgba(232, 231, 226, 0.75)';

	let state = 'loading'; // 'loading' | 'ready' | 'error'
	let meta = null;
	let legend = [];
	let hoveredName = '';

	let containerEl;
	let graph = null;
	let resizeObserver = null;

	const colorByType = new Map();
	const neighbours = new Map();
	let hovered = null;
	let hoverSet = new Set();

	function assignColors(nodes) {
		const counts = new Map();
		for (const n of nodes) counts.set(n.type, (counts.get(n.type) ?? 0) + 1);
		const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);

		if (counts.has('person')) colorByType.set('person', PERSON_COLOR);
		let i = 0;
		for (const [type] of ranked) {
			if (type === 'person' || i >= RAMP.length) continue;
			colorByType.set(type, RAMP[i]);
			i += 1;
		}

		legend = ranked
			.filter(([type]) => colorByType.has(type))
			.map(([type, count]) => ({ type, count, color: colorByType.get(type) }))
			.slice(0, 6);
		const otherCount = ranked
			.filter(([type]) => !colorByType.has(type))
			.reduce((sum, [, count]) => sum + count, 0);
		if (otherCount > 0)
			legend = [...legend, { type: 'other', count: otherCount, color: OTHER_COLOR }];
	}

	function nodeColor(node) {
		return colorByType.get(node.type) ?? OTHER_COLOR;
	}

	function nodeRadius(node) {
		return Math.min(12, 2 + Math.sqrt(node.links || 1) * 1.15);
	}

	async function load() {
		state = 'loading';
		try {
			const res = await fetch(`${CHAT_API_BASE}/graph`);
			if (!res.ok) throw new Error(`graph request failed with status ${res.status}`);
			const data = await res.json();
			meta = data.meta;
			assignColors(data.nodes);

			neighbours.clear();
			for (const n of data.nodes) neighbours.set(n.id, new Set());
			for (const e of data.edges) {
				neighbours.get(e.source)?.add(e.target);
				neighbours.get(e.target)?.add(e.source);
			}

			state = 'ready';
			await render(data);
		} catch (err) {
			console.error('knowledge graph failed to load', err);
			state = 'error';
		}
	}

	async function render(data) {
		const { default: ForceGraph } = await import('force-graph');

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const labelThreshold = [...data.nodes.map((n) => n.links)].sort((a, b) => b - a)[20] ?? 0;
		let fitted = false;

		graph = new ForceGraph(containerEl)
			.graphData({ nodes: data.nodes, links: data.edges })
			.width(containerEl.clientWidth)
			.height(containerEl.clientHeight)
			.nodeId('id')
			.nodeVal((n) => nodeRadius(n) ** 2 / 4)
			.minZoom(0.25)
			.maxZoom(6)
			.warmupTicks(reducedMotion ? 250 : 0)
			.cooldownTicks(reducedMotion ? 0 : undefined)
			.nodeCanvasObject((node, ctx, scale) => {
				const dimmed = hovered && node !== hovered && !hoverSet.has(node.id);
				const r = nodeRadius(node);
				ctx.globalAlpha = dimmed ? 0.12 : 1;
				ctx.fillStyle = nodeColor(node);
				ctx.beginPath();
				ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
				ctx.fill();

				const labelled =
					node === hovered || hoverSet.has(node.id) || node.links >= labelThreshold || scale > 2.4;
				if (labelled && !dimmed) {
					ctx.font = `${11 / scale}px ui-monospace, monospace`;
					ctx.textAlign = 'center';
					ctx.textBaseline = 'top';
					ctx.fillStyle = LABEL_COLOR;
					ctx.fillText(node.id, node.x, node.y + r + 2 / scale);
				}
				ctx.globalAlpha = 1;
			})
			.nodePointerAreaPaint((node, color, ctx) => {
				ctx.fillStyle = color;
				ctx.beginPath();
				ctx.arc(node.x, node.y, nodeRadius(node) + 4, 0, 2 * Math.PI);
				ctx.fill();
			})
			.linkColor((link) => {
				if (!hovered) return LINK_COLOR;
				const touches = link.source.id === hovered.id || link.target.id === hovered.id;
				return touches ? LINK_HOT : 'rgba(232, 231, 226, 0.03)';
			})
			.linkWidth((link) => {
				const base = Math.min(1.6, 0.3 + (link.weight || 1) * 0.12);
				if (!hovered) return base;
				const touches = link.source.id === hovered.id || link.target.id === hovered.id;
				return touches ? base + 0.6 : base;
			})
			.onNodeHover((node) => {
				hovered = node || null;
				hoverSet = node ? neighbours.get(node.id) ?? new Set() : new Set();
				hoveredName = node ? node.id : '';
			})
			.onEngineStop(() => {
				if (!fitted) {
					fitted = true;
					graph.zoomToFit(reducedMotion ? 0 : 600, 48);
				}
			});

		graph.d3Force('charge')?.strength(-45);
		graph.d3Force('link')?.distance(34);

		resizeObserver = new ResizeObserver(() => {
			graph?.width(containerEl.clientWidth).height(containerEl.clientHeight);
		});
		resizeObserver.observe(containerEl);
	}

	onMount(() => {
		load();
		gsap.fromTo(
			'.graph-reveal',
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }
		);
	});

	onDestroy(() => {
		resizeObserver?.disconnect();
		graph?._destructor?.();
	});
</script>

<svelte:head>
	<title>Knowledge Graph | Arnav Jagetia</title>
	<meta
		name="description"
		content="The knowledge graph behind Arnav Jagetia's portfolio chatbot - the entities and relationships LightRAG extracted from his documents."
	/>
</svelte:head>

<!-- custom cursor -->
<Cursor />

<div class="p-8 space-y-8">
	<div class="relative z-40 flex justify-center items-center h-full mx-auto">
		<PageLink href="/chat" class="absolute left-0">Back to Chat</PageLink>
		<HomeLogo />
	</div>

	<div class="mx-auto w-[90%] max-w-6xl">
		<h1
			class="graph-reveal h2 font-bold flex items-center gap-8 whitespace-nowrap
			before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15
			after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15"
		>
			THE KNOWLEDGE GRAPH
		</h1>

		<p class="graph-reveal mt-5 text-center text-sm dark:text-primary-700 max-w-2xl mx-auto">
			 These are the entities and relationships extracted from my documents, neatly visualised as a knowledge graph. Every answer the chatbot gives is grounded here.
		</p>

		{#if state === 'ready' && legend.length}
			<div class="graph-reveal mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
				{#each legend as item}
					<span class="font-mono text-[10.5px] dark:text-primary-900">
						<span
							class="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
							style="background: {item.color}"
						/>{item.type} &middot; {item.count}
					</span>
				{/each}
			</div>
		{/if}

		<div
			class="graph-reveal relative mt-6 border border-primary-500/15 rounded-lg overflow-hidden
			h-[68vh] min-h-[420px]"
			data-cursor-static
		>
			<div bind:this={containerEl} class="absolute inset-0" />

			{#if state === 'loading'}
				<div class="absolute inset-0 flex items-center justify-center">
					<span class="font-mono text-[11px] dark:text-primary-900"
						>assembling the graph&hellip;</span
					>
				</div>
			{:else if state === 'error'}
				<div
					class="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center px-8"
				>
					<p class="dark:text-primary-700 max-w-md">
						The graph is unreachable right now. Give it a minute and try again.
					</p>
					<button
						on:click={load}
						class="px-8 py-3 border border-primary-500/30 hover:border-primary-500/60
						transition-colors duration-150 tracking-[0.2em] text-sm uppercase"
					>
						Retry
					</button>
				</div>
			{/if}

			{#if hoveredName}
				<div
					class="absolute bottom-3 left-4 font-mono text-[11px] dark:text-primary-700 pointer-events-none"
				>
					{hoveredName} &middot; {neighbours.get(hoveredName)?.size ?? 0} connections
				</div>
			{/if}
		</div>

		<p class="graph-reveal mt-4 text-center font-mono text-[10.5px] dark:text-primary-900">
			drag to pan &middot; scroll to zoom &middot; hover a node for its name and neighbours
		</p>
	</div>
</div>
