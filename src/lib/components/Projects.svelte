<script>
	import JewelryFinder from '../icons/projects/JewelryFinder.svelte';
	import InstantContextMCP from '../icons/projects/InstantContextMCP.svelte';
	import ProductNotifier from '../icons/projects/ProductNotifier.svelte';
	import AthenaRevision from '../icons/projects/AthenaRevision.svelte';
    import Dfinsta from '../icons/projects/Dfinsta.svelte';
    import Arnavai from '../icons/projects/Arnavai.svelte';
    import Carteblanchechat from '../icons/projects/Carteblanchechat.svelte';

	// `stack` renders as a `tech / tech / tech` line under the description, in the same
	// idiom as the skills manifest. Left empty until the real tags are filled in.
	const PROJECTS = [
        {
            title: "DFInsta Redux",
            description: "Automated pipeline that re-ports a distraction-free Instagram mod onto every new release, re-resolving version independent smali hooks onto freshly obfuscated code",
            stack: ["Python", "Smali", "Claude Agents SDK", "Temporal"],
            icon: Dfinsta,
            link: "https://github.com/arnav-exe/dfinsta-redux"
        },
        {
            title: "Arnav-ai",
            description: "Self-hosted agentic RAG chatbot gateway routed through LiteLLM, powered by vector search over a knowledge graph, deployed as a containerized stack behind a Cloudflare tunnel",
            stack: ["Python", "vLLM", "LightRAG", "Litellm", "Qwen3.8-27b", "google-adk", "Docker"],
            icon: Arnavai,
            link: "https://github.com/arnav-exe/arnav-ai"
        },
        {
            title: "Carte Blanche Chat",
            description: "A chat app where every reply is a layer-streamed HTML document",
            stack: ["Python", "Anthropic SDK", "FastAPI", "Uvicorn", "httpx"],
            icon: Carteblanchechat,
            link: "https://github.com/arnav-exe/carte-blanche-chat"
        },
		{
			title: "AI Jewelry Finder",
			description: "Turns a sketch and a few design details into a ranked product search.",
			stack: [, "", "", "", ""],
			icon: JewelryFinder,
			link: "",
			incomplete: true
		},
		{
			title: "Instant Context MCP Server",
			description: "Indexes llms*.txt docs so an LLM can pull grounded context mid-task.",
			stack: ["Python", "FastMCP", "SQLite", "BM25", "httpx"],
			icon: InstantContextMCP,
			link: "https://github.com/arnav-exe/instant-context-mcp"
		},
		{
			title: "Product Notifier",
			description: "Watches retailers for stock and price, then pings ntfy when your conditions are met.",
			stack: ["Python", "Node.js", "Requests", "Crawl4ai", "asyncio"],
			icon: ProductNotifier,
			link: "https://github.com/arnav-exe/product-notifier"
		},
		{
			title: "Athena - AI Revision Assistant",
			description: "Answers revision questions from a resource library, with source citations.",
			stack: ["Python", "RAG", "Weaviate", "Ollama", "Streamlit", "Hybrid search", "Gemma3-12b", "mxbai-embed-large"],
			icon: AthenaRevision,
			link: "https://github.com/arnav-exe/athena-revision-assistant"
		},
	];

	const GITHUB_PROFILE = 'https://github.com/arnav-exe/';
</script>

<div class="projects-grid">
	{#each PROJECTS as project}
		<svelte:element
			this={project.link ? 'a' : 'div'}
			class="project-cell"
			href={project.link || undefined}
		>
			<span class="cell-ghost" aria-hidden="true">
				<svelte:component this={project.icon} />
			</span>

			<span class="cell-top">
				<span class="cell-mark"><svelte:component this={project.icon} /></span>
				{#if project.incomplete}
					<span class="cell-flag">In progress</span>
				{/if}
			</span>

			<span class="cell-name">{project.title}</span>
			<span class="cell-desc">{project.description}</span>

			{#if project.stack.length}
				<span class="cell-stack">
					{#each project.stack as tech, i}{tech}{#if i < project.stack.length - 1}<span
								class="cell-sep">/</span
							>{/if}{/each}
				</span>
			{/if}
		</svelte:element>
	{/each}

	<!-- fills the eighth slot, so the 2-column grid never ends on an empty cell -->
	<a class="project-cell cell-more" href={GITHUB_PROFILE}>
		<span>All repositories</span>
		<span class="cell-more-arrow">&#8599;</span>
	</a>
</div>

<style>
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		width: 100%;
		/* same hairline the skills rows and section headings use */
		--rule: rgb(var(--color-surface-500) / 0.15);
	}

	:global(.dark) .projects-grid {
		--rule: rgb(var(--color-primary-500) / 0.15);
	}

	/* cells stay transparent so the section always sits on the page's own ground, whatever
	   that is — each cell draws only its right and bottom edge, so rules are never doubled */
	.project-cell {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.6rem 1.75rem;
		border-right: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
		color: inherit;
		text-decoration: none;
	}

	/* right-hand column and final row lose their outer edge, so the grid is ruled on the
	   inside only — the same way the skills manifest drops its last border-bottom */
	.project-cell:nth-child(2n) {
		border-right: none;
	}

	.project-cell:nth-last-child(-n + 2) {
		border-bottom: none;
	}

	/* the only fill in the section — the cells themselves never paint a background */
	.project-cell::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 0;
		background: rgb(var(--color-surface-500) / 0.045);
		opacity: 0;
		pointer-events: none;
		transition: opacity 200ms ease;
	}

	:global(.dark) .project-cell::before {
		background: rgb(var(--color-secondary-500) / 0.05);
	}

	a.project-cell:hover::before,
	a.project-cell:focus-visible::before {
		opacity: 1;
	}

	.project-cell:focus-visible {
		outline: 2px solid rgb(var(--color-tertiary-500));
		outline-offset: -2px;
	}

	.cell-ghost {
		position: absolute;
		right: -12%;
		top: 50%;
		z-index: 0;
		display: block;
		width: 62%;
		aspect-ratio: 1;
		opacity: 0;
		transform: translateY(-50%) scale(0.92);
		pointer-events: none;
		/* dissolve left edge */
		-webkit-mask-image: linear-gradient(100deg, transparent 20%, #000 72%);
		mask-image: linear-gradient(100deg, transparent 20%, #000 72%);
		transition:
			opacity 340ms ease,
			transform 340ms ease;
	}

	:global(.cell-ghost svg) {
		width: 100%;
		height: 100%;
		display: block;
	}

	a.project-cell:hover .cell-ghost,
	a.project-cell:focus-visible .cell-ghost {
		opacity: 0.07;
		transform: translateY(-50%) scale(1);
	}

	.cell-top,
	.cell-name,
	.cell-desc,
	.cell-stack {
		position: relative;
		z-index: 1;
	}

	.cell-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.15rem;
	}

	.cell-mark {
		display: block;
		width: 1.9rem;
		height: 1.9rem;
		flex-shrink: 0;
		transition: transform 260ms ease;
	}

	:global(.cell-mark svg) {
		width: 100%;
		height: 100%;
		display: block;
	}

	a.project-cell:hover .cell-mark {
		transform: scale(1.12);
	}

	.cell-flag {
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		white-space: nowrap;
		color: rgb(var(--color-tertiary-700));
	}

	:global(.dark) .cell-flag {
		color: rgb(var(--color-tertiary-500));
	}

	.cell-name {
		font-size: 1.2rem;
		line-height: 1.25;
		font-weight: 700;
		color: rgb(var(--color-surface-500));
	}

	:global(.dark) .cell-name {
		color: rgb(var(--color-primary-500));
	}

	.cell-desc {
		font-size: 0.95rem;
		line-height: 1.45;
		color: rgb(var(--color-surface-400));
	}

	:global(.dark) .cell-desc {
		color: rgb(var(--color-secondary-700));
	}

	.cell-stack {
		margin-top: auto;
		padding-top: 0.6rem;
		font-size: 0.8rem;
		letter-spacing: 0.04em;
		color: rgb(var(--color-secondary-800));
	}

	:global(.dark) .cell-stack {
		color: rgb(var(--color-secondary-500));
	}

	.cell-sep {
		opacity: 0.45;
		margin: 0 0.4rem;
	}

	.cell-more {
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 0.7rem;
		font-size: 0.85rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgb(var(--color-secondary-800));
	}

	:global(.dark) .cell-more {
		color: rgb(var(--color-secondary-500));
	}

	.cell-more-arrow {
		display: inline-block;
		transition: transform 200ms ease;
	}

	.cell-more:hover .cell-more-arrow {
		transform: translate(3px, -3px);
	}

	@media (max-width: 767px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}

		.project-cell {
			padding: 1.25rem 1.15rem;
			border-right: none;
		}

		/* single column, so the old final row is mid-list now and needs its rule back.
		   both of these have to out-specify the two-column rules above, not just follow them */
		.project-cell:nth-last-child(-n + 2) {
			border-bottom: 1px solid var(--rule);
		}

		.project-cell:last-child {
			border-bottom: none;
		}

		.cell-name {
			font-size: 1.05rem;
		}

		.cell-desc {
			font-size: 0.9rem;
		}

		.cell-mark {
			width: 1.6rem;
			height: 1.6rem;
		}

		.cell-ghost {
			width: 48%;
			right: -8%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cell-ghost,
		.cell-mark,
		.cell-more-arrow,
		.project-cell::before {
			transition: none;
		}
	}
</style>
