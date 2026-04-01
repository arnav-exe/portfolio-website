<script>
	export let title = 'Blog Post';
	export let description = '';
	export let date = '';
	export let tags = [];
	export let readingTime = 0;

	// Format date
	const formatDate = (dateString) => {
		const raw =
			typeof dateString === 'string'
				? dateString
				: dateString instanceof Date
					? dateString.toISOString()
					: String(dateString || '');
		const parts = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
		const options = { year: 'numeric', month: 'long', day: 'numeric' };

		if (parts) {
			const [, year, month, day] = parts;
			return new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString(
				'en-US',
				options
			);
		}

		return new Date(raw).toLocaleDateString('en-US', options);
	};
</script>

<svelte:head>
	<title>{title} - Arnav Jagetia</title>
</svelte:head>

<main class="p-8 w-full overflow-x-hidden">
	<div class="max-w-4xl mx-auto">
		<!-- Back button -->
		<a
			href="/blog"
			class="inline-flex items-center mb-8 pb-0.5 border-b border-transparent text-surface-500 hover:text-surface-400 dark:text-primary-500 dark:hover:text-primary-400 underline-offset-4 hover:border-current transition-colors"
		>
			<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Back to Blog
		</a>

		<!-- Article header -->
		<article class="max-w-none">
			<header class="mb-8">
				<h1 class="h1 font-bold mb-4">{title}</h1>

				{#if description}
					<p class="text-xl mb-4 blog-header-muted">{description}</p>
				{/if}

				<div data-cursor-static class="flex flex-wrap items-center gap-4 text-sm blog-header-muted">
					{#if date}
						<span>{formatDate(date)}</span>
					{/if}

					{#if readingTime}
						<span>•</span>
						<span>{readingTime} min read</span>
					{/if}
				</div>

				{#if tags && tags.length > 0}
					<div class="flex flex-wrap gap-2 mt-4">
						{#each tags as tag}
							<span
								data-cursor-static
								class="badge bg-surface-500 dark:bg-primary-500 text-primary-500 dark:text-surface-500 px-2 py-1 text-xs"
							>
								{tag}
							</span>
						{/each}
					</div>
				{/if}
			</header>

			<!-- blog content -->
			<div class="blog-content">
				<slot />
			</div>
		</article>
	</div>
</main>

<style>
	/* blog content styling */
	.blog-header-muted {
		color: rgb(104 104 104);
	}

	:global(.blog-content h2) {
		font-size: 1.875rem;
		font-weight: 700;
		line-height: 1.25;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: rgb(17 17 17);
	}

	:global(.blog-content h3) {
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1.25;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		color: rgb(17 17 17);
	}

	:global(.blog-content p) {
		margin-bottom: 1rem;
		color: rgb(104 104 104);
		line-height: 1.75;
	}

	:global(.blog-content ul),
	:global(.blog-content ol) {
		margin-top: 1rem;
		margin-bottom: 1rem;
		margin-left: 1.75rem;
		color: rgb(104 104 104);
		font-size: inherit;
		line-height: inherit;
	}

	:global(.blog-content ul) {
		list-style-type: disc;
	}

	:global(.blog-content ol) {
		list-style-type: decimal;
	}

	:global(.blog-content li) {
		margin-bottom: 0.5rem;
		font-size: inherit;
		line-height: inherit;
	}

	:global(.blog-content li::marker) {
		color: rgb(47 47 47);
		font-weight: 700;
		font-size: 1.08em;
	}

	:global(.blog-content hr) {
		display: block;
		height: 0;
		border: 0;
		border-top: 1px solid rgb(212 201 174);
		margin: 2rem 0;
	}

	:global(.blog-content code) {
		background-color: rgb(212 201 174);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}

	:global(.blog-content pre) {
		background-color: rgb(var(--color-surface-500) / 0.9);
		border: 1px solid rgb(var(--color-secondary-700) / 0.45);
		padding: 1rem;
		border-radius: 0.75rem;
		overflow-x: auto;
		margin-bottom: 1rem;
	}

	:global(.blog-content pre code) {
		background-color: transparent;
		padding: 0;
		white-space: pre-wrap;
		word-break: break-word;
		overflow-wrap: anywhere;
	}

	:global(.blog-content a) {
		color: rgb(47 47 47);
		text-decoration: underline;
	}

	:global(.blog-content a:hover) {
		color: rgb(35 35 35);
	}

	:global(.blog-content blockquote) {
		border-left: 4px solid rgb(212 201 174);
		padding-left: 1rem;
		font-style: italic;
		margin: 1rem 0;
	}

	:global(.blog-content q) {
		font-style: italic;
		color: rgb(47 47 47);
	}

	:global(.blog-content q::before),
	:global(.blog-content q::after) {
		font-style: normal;
		font-weight: 700;
		font-size: 1.08em;
		line-height: inherit;
		color: rgb(47 47 47);
	}

	:global(.blog-content p > q:only-child) {
		display: block;
		margin-bottom: 1rem;
	}

	:global(.blog-content figure) {
		margin: 1.25rem 0;
		border-radius: 0.75rem;
		overflow: hidden;
		border: 1px solid rgb(var(--color-secondary-700) / 0.45);
		background-color: rgb(var(--color-surface-500) / 0.9);
	}

	:global(.blog-content figure img) {
		display: block;
		width: 100%;
		margin: 0;
		border-radius: 0;
	}

	:global(.blog-content figure figcaption) {
		margin: 0;
		padding: 0.625rem 0.9rem;
		text-align: center;
		font-style: italic;
		font-size: 0.95rem;
		color: rgb(var(--color-secondary-400));
		background-color: rgb(var(--color-surface-400) / 0.2);
		border-radius: 0;
	}

	:global(.blog-content table) {
		display: block;
		width: 100%;
		overflow-x: auto;
		margin: 1.25rem 0;
		border: 1px solid rgb(var(--color-secondary-700) / 0.45);
		border-radius: 0.75rem;
		background-color: rgb(var(--color-surface-500) / 0.9);
		border-collapse: separate;
		border-spacing: 0;
	}

	:global(.blog-content thead) {
		background-color: rgb(var(--color-surface-400) / 0.2);
	}

	:global(.blog-content th),
	:global(.blog-content td) {
		padding: 0.75rem 0.9rem;
		text-align: left;
		white-space: normal;
		word-break: break-word;
		overflow-wrap: anywhere;
	}

	:global(.blog-content th) {
		font-weight: 700;
		color: rgb(17 17 17);
		border-bottom: 1px solid rgb(var(--color-secondary-700) / 0.45);
	}

	:global(.blog-content td) {
		color: rgb(104 104 104);
		border-bottom: 1px solid rgb(var(--color-secondary-700) / 0.28);
	}

	:global(.blog-content tbody tr:nth-child(even)) {
		background-color: rgb(var(--color-surface-400) / 0.12);
	}

	:global(.blog-content tbody tr:last-child td) {
		border-bottom: 0;
	}

	:global(.blog-content img) {
		border-radius: 0.5rem;
		margin: 1rem 0;
	}

	/* Dark mode styles */
	:global([data-theme='minimalist'].dark) .blog-header-muted {
		color: rgb(183 176 157);
	}

	:global([data-theme='minimalist'].dark .blog-content h2),
	:global([data-theme='minimalist'].dark .blog-content h3) {
		color: rgb(237 229 209);
	}

	:global([data-theme='minimalist'].dark .blog-content p),
	:global([data-theme='minimalist'].dark .blog-content ul),
	:global([data-theme='minimalist'].dark .blog-content ol) {
		color: rgb(183 176 157);
	}

	:global([data-theme='minimalist'].dark .blog-content li::marker) {
		color: rgb(225 217 198);
	}

	:global([data-theme='minimalist'].dark .blog-content hr) {
		border-top-color: rgb(88 88 88);
	}

	:global([data-theme='minimalist'].dark .blog-content code) {
		background-color: rgb(var(--color-surface-400) / 0.22);
	}

	:global([data-theme='minimalist'].dark .blog-content pre code) {
		background-color: transparent;
	}

	:global([data-theme='minimalist'].dark .blog-content pre) {
		background-color: rgb(var(--color-surface-400) / 0.2);
		border-color: rgb(var(--color-primary-500) / 0.18);
	}

	:global([data-theme='minimalist'].dark .blog-content figure) {
		background-color: rgb(var(--color-surface-400) / 0.2);
		border-color: rgb(var(--color-primary-500) / 0.18);
	}

	:global([data-theme='minimalist'].dark .blog-content figure figcaption) {
		color: rgb(var(--color-secondary-500));
		background-color: rgb(var(--color-surface-300) / 0.22);
	}

	:global([data-theme='minimalist'].dark .blog-content table) {
		background-color: rgb(var(--color-surface-400) / 0.2);
		border-color: rgb(var(--color-primary-500) / 0.18);
	}

	:global([data-theme='minimalist'].dark .blog-content thead) {
		background-color: rgb(var(--color-surface-300) / 0.22);
	}

	:global([data-theme='minimalist'].dark .blog-content th) {
		color: rgb(237 229 209);
		border-bottom-color: rgb(var(--color-primary-500) / 0.18);
	}

	:global([data-theme='minimalist'].dark .blog-content td) {
		color: rgb(183 176 157);
		border-bottom-color: rgb(var(--color-primary-500) / 0.12);
	}

	:global([data-theme='minimalist'].dark .blog-content tbody tr:nth-child(even)) {
		background-color: rgb(var(--color-surface-300) / 0.15);
	}

	@media (max-width: 767px) {
		:global(.blog-content th),
		:global(.blog-content td) {
			padding: 0.6rem 0.7rem;
			white-space: normal;
			word-break: break-word;
			overflow-wrap: anywhere;
			font-size: 0.9rem;
			line-height: 1.45;
		}
	}

	:global([data-theme='minimalist'].dark .blog-content a) {
		color: rgb(212 201 174);
	}

	:global([data-theme='minimalist'].dark .blog-content a:hover) {
		color: rgb(225 217 198);
	}

	:global([data-theme='minimalist'].dark .blog-content blockquote) {
		border-left-color: rgb(237 229 209);
	}

	:global([data-theme='minimalist'].dark .blog-content q) {
		color: rgb(225 217 198);
	}

	:global([data-theme='minimalist'].dark .blog-content q::before),
	:global([data-theme='minimalist'].dark .blog-content q::after) {
		color: rgb(225 217 198);
	}
</style>
