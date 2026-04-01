<script>
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import Cursor from '../../lib/components/Cursor.svelte';

	export let data;

	let page = 1;
	let searchQuery = '';
	let selectedTag = 'all';
	let currentPage = 1;
	const postsPerPage = 6;

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

	// Reactive filtering and pagination
	$: filteredPosts = data.posts.filter((post) => {
		const matchesSearch =
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
		return matchesSearch && matchesTag;
	});

	$: totalPages = Math.ceil(filteredPosts.length / postsPerPage);
	$: paginatedPosts = filteredPosts.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage
	);

	// Reset to page 1 when filters change
	$: if (searchQuery || selectedTag) {
		currentPage = 1;
	}
</script>

<svelte:head>
	<title>Blog | Arnav Jagetia</title>
	<meta
		name="description"
		content="Technical blog covering web development, cloud architecture, and software engineering by Arnav Jagetia."
	/>
</svelte:head>

<!-- custom cursor -->
<Cursor />

<div class="p-8 space-y-8">
	<div class="relative flex justify-center items-center">
		<a href="/">
			<svg
				class="w-8 fill-surface-500 dark:fill-primary-500"
				id="Layer_1"
				data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 3000 1879.55"
				><polygon points="1085.04 0.2 957.42 221.26 957.3 221.05 1084.92 0 1085.04 0.2" /><polygon
					points="2042.46 1658.5 1914.84 1879.55 1914.63 1879.19 2042.25 1658.14 2042.46 1658.5"
				/><polygon
					points="3000 0.58 2872.38 221.63 2871.63 221.63 2042.25 1658.14 1914.63 1879.19 1787.01 1658.14 1085.05 442.31 255.25 1879.55 0 1879.55 957.42 221.26 1085.04 0.2 1212.66 221.26 1914.63 1437.1 2616.38 221.63 1978.65 221.63 1978.65 0.58 3000 0.58"
				/><polygon
					points="1212.79 221.05 1212.66 221.26 1085.04 0.2 1085.16 0 1212.79 221.05"
				/><polygon
					points="1914.63 1879.19 1914.42 1879.55 1786.8 1658.5 1787.01 1658.14 1914.63 1879.19"
				/><polygon points="2744.67 0.58 2744 0.58 2744.34 0 2744.67 0.58" /></svg
			>
		</a>
		<div class="absolute right-0">
			<RadioGroup
				background="bg-secondary-500 dark:bg-surface-900"
				active="bg-surface-900 dark:bg-primary-500"
				color="text-primary-500 dark:text-surface-900"
			>
				<a href="/"><RadioItem bind:group={page} value={0}>Portfolio</RadioItem></a>
				<RadioItem bind:group={page} value={1}>Blog</RadioItem>
			</RadioGroup>
		</div>
	</div>

	<div class="flex justify-center items-center h-full flex-col mx-auto w-[90%]">
		<h1 class="h1 font-bold mt-8 mb-8 uppercase">Welcome To My Dev Blog</h1>

		<!-- Search and Filter Section -->
		<div class="w-full mb-8 space-y-4">
			<!-- Search Bar -->
			<input
				type="text"
				placeholder="Search posts..."
				bind:value={searchQuery}
				class="search-input w-full p-4 rounded-lg bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 placeholder-surface-400 dark:placeholder-secondary-700 outline-none"
			/>

			<!-- Tag Filter -->
			<div class="flex flex-wrap gap-2">
				<button
					on:click={() => (selectedTag = 'all')}
					class="px-4 py-2 rounded-lg transition-all {selectedTag === 'all'
						? 'bg-surface-500 dark:bg-primary-500 text-primary-500 dark:text-surface-500'
						: 'bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 hover:bg-surface-400 dark:hover:bg-surface-800'}"
				>
					All
				</button>
				{#each data.allTags as tag}
					<button
						on:click={() => (selectedTag = tag)}
						class="px-4 py-2 rounded-lg transition-all {selectedTag === tag
							? 'bg-surface-500 dark:bg-primary-500 text-primary-500 dark:text-surface-500'
							: 'bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 hover:bg-surface-400 dark:hover:bg-surface-800'}"
					>
						{tag}
					</button>
				{/each}
			</div>
		</div>

		<!-- Blog Posts List -->
		{#if paginatedPosts.length > 0}
			<div class="flex flex-col gap-6 w-full mb-8">
				{#each paginatedPosts as post}
					<a
						href="/blog/{post.slug}"
						class="block group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-500 dark:focus-visible:ring-primary-500"
					>
						<div
							class="post-card h-full p-6 rounded-lg bg-secondary-500 dark:bg-surface-800 transition-all"
						>
							<h2
								class="h3 font-bold mb-2 text-surface-500 dark:text-primary-500 group-hover:text-surface-600 dark:group-hover:text-primary-400"
							>
								{post.title}
							</h2>

							<div
								class="flex flex-wrap items-center gap-2 mb-3 text-sm text-surface-400 dark:text-secondary-700"
							>
								<span>{formatDate(post.date)}</span>
								<span>•</span>
								<span>{post.readingTime} min read</span>
							</div>

							{#if post.tags && post.tags.length > 0}
								<div class="flex flex-wrap gap-2 mb-3">
									{#each post.tags as tag}
										<span
											class="badge bg-surface-500 dark:bg-primary-500 text-primary-500 dark:text-surface-500 px-2 py-1 text-xs"
										>
											{tag}
										</span>
									{/each}
								</div>
							{/if}

							<p class="text-surface-400 dark:text-secondary-700">
								{post.description}
							</p>
						</div>
					</a>
				{/each}
			</div>

			<!-- Pagination -->
			{#if totalPages > 1}
				<div class="flex justify-center items-center gap-2 mt-8">
					<button
						on:click={() => (currentPage = Math.max(1, currentPage - 1))}
						disabled={currentPage === 1}
						class="px-4 py-2 rounded-lg bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-400 dark:hover:bg-surface-800 transition-all"
					>
						Previous
					</button>

					{#each Array(totalPages) as _, i}
						<button
							on:click={() => (currentPage = i + 1)}
							class="px-4 py-2 rounded-lg transition-all {currentPage === i + 1
								? 'bg-surface-500 dark:bg-primary-500 text-primary-500 dark:text-surface-500'
								: 'bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 hover:bg-surface-400 dark:hover:bg-surface-800'}"
						>
							{i + 1}
						</button>
					{/each}

					<button
						on:click={() => (currentPage = Math.min(totalPages, currentPage + 1))}
						disabled={currentPage === totalPages}
						class="px-4 py-2 rounded-lg bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-400 dark:hover:bg-surface-800 transition-all"
					>
						Next
					</button>
				</div>
			{/if}
		{:else}
			<div class="text-center py-16">
				<p class="text-xl text-surface-400 dark:text-secondary-700">
					No posts found matching your criteria.
				</p>
			</div>
		{/if}
	</div>
</div>

<style>
	p {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.search-input {
		border: 1px solid rgb(var(--color-secondary-600) / 0.85);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
		transition:
			border-color 160ms ease,
			box-shadow 160ms ease,
			background-color 160ms ease;
	}

	.search-input:hover {
		border-color: rgb(var(--color-surface-400) / 0.6);
		background-color: rgb(var(--color-secondary-400));
	}

	.search-input:focus {
		border-color: rgb(var(--color-surface-500));
		box-shadow: 0 0 0 3px rgb(var(--color-surface-500) / 0.14);
	}

	.post-card {
		position: relative;
		overflow: hidden;
		border: 1px solid rgb(var(--color-secondary-600) / 0.85);
		box-shadow: 0 8px 20px rgb(var(--color-surface-500) / 0.08);
		transition:
			transform 180ms ease,
			border-color 180ms ease,
			box-shadow 180ms ease,
			background-color 180ms ease;
	}

	.post-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(
			90deg,
			rgb(var(--color-secondary-500) / 0.85),
			rgb(var(--color-tertiary-500) / 0.9)
		);
		transform: scaleX(0);
		transform-origin: left;
		opacity: 0;
		transition:
			transform 180ms ease,
			opacity 180ms ease;
	}

	.group:hover .post-card,
	.group:focus-visible .post-card {
		transform: translateY(-2px);
		border-color: rgb(var(--color-surface-500) / 0.45);
		box-shadow: 0 16px 28px rgb(var(--color-surface-500) / 0.16);
		background-color: rgb(var(--color-secondary-400));
	}

	.group:hover .post-card::before,
	.group:focus-visible .post-card::before {
		transform: scaleX(1);
		opacity: 1;
	}

	:global(.dark) .search-input {
		border-color: rgb(var(--color-secondary-900) / 0.55);
		box-shadow: 0 8px 20px rgb(var(--color-surface-900) / 0.5);
	}

	:global(.dark) .search-input:hover {
		border-color: rgb(var(--color-primary-500) / 0.28);
		background-color: rgb(var(--color-surface-700));
	}

	:global(.dark) .search-input:focus {
		border-color: rgb(var(--color-primary-500) / 0.75);
		box-shadow: 0 0 0 3px rgb(var(--color-primary-500) / 0.2);
	}

	:global(.dark) .post-card {
		border-color: rgb(var(--color-secondary-900) / 0.55);
		box-shadow: 0 10px 24px rgb(var(--color-surface-900) / 0.45);
	}

	:global(.dark) .post-card::before {
		background: linear-gradient(
			90deg,
			rgb(var(--color-secondary-400) / 0.78),
			rgb(var(--color-tertiary-400) / 0.9)
		);
	}

	:global(.dark) .group:hover .post-card,
	:global(.dark) .group:focus-visible .post-card {
		border-color: rgb(var(--color-primary-500) / 0.38);
		box-shadow: 0 18px 34px rgb(var(--color-surface-900) / 0.62);
		background-color: rgb(var(--color-surface-700));
	}

	@media (prefers-reduced-motion: reduce) {
		.search-input,
		.post-card {
			transition: none;
		}

		.group:hover .post-card,
		.group:focus-visible .post-card {
			transform: none;
		}
	}
</style>
