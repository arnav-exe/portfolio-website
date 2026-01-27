<script>
	import { LightSwitch, RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
	import Cursor from "../../lib/components/Cursor.svelte";

	export let data;

	let page = 1;
	let searchQuery = "";
	let selectedTag = "all";
	let currentPage = 1;
	const postsPerPage = 6;

	// Format date
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('en-US', options);
	};

	// Reactive filtering and pagination
	$: filteredPosts = data.posts.filter(post => {
		const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
							  post.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);
		return matchesSearch && matchesTag;
	});

	$: totalPages = Math.ceil(filteredPosts.length / postsPerPage);
	$: paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

	// Reset to page 1 when filters change
	$: if (searchQuery || selectedTag) {
		currentPage = 1;
	}
</script>

<!-- custom cursor -->
<Cursor />

<div class="p-8 space-y-8">
	<div class="z-0 relative flex justify-between items-center m-0 start-0">
		<LightSwitch bgLight="bg-secondary-500" fillLight="fill-primary-500" />

		<div class="-z-50 absolute w-full flex justify-center items-center">
			<a href="/">
				<svg class="w-8 fill-surface-500 dark:fill-primary-500" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 1879.55"><polygon points="1085.04 0.2 957.42 221.26 957.3 221.05 1084.92 0 1085.04 0.2"/><polygon points="2042.46 1658.5 1914.84 1879.55 1914.63 1879.19 2042.25 1658.14 2042.46 1658.5"/><polygon points="3000 0.58 2872.38 221.63 2871.63 221.63 2042.25 1658.14 1914.63 1879.19 1787.01 1658.14 1085.05 442.31 255.25 1879.55 0 1879.55 957.42 221.26 1085.04 0.2 1212.66 221.26 1914.63 1437.1 2616.38 221.63 1978.65 221.63 1978.65 0.58 3000 0.58"/><polygon points="1212.79 221.05 1212.66 221.26 1085.04 0.2 1085.16 0 1212.79 221.05"/><polygon points="1914.63 1879.19 1914.42 1879.55 1786.8 1658.5 1787.01 1658.14 1914.63 1879.19"/><polygon points="2744.67 0.58 2744 0.58 2744.34 0 2744.67 0.58"/></svg>
			</a>
		</div>

		<RadioGroup class="justify-end" background="bg-secondary-500 dark:bg-surface-900" active="bg-surface-900 dark:bg-primary-500" color="text-primary-500 dark:text-surface-900">
			<a href="/"><RadioItem bind:group={page} value={0}>Portfolio</RadioItem></a>
			<RadioItem bind:group={page} value={1}>Blog</RadioItem>
		</RadioGroup>
	</div>

	<div class="flex justify-center items-center h-full flex-col mx-auto w-[90%]">
		<h1 class="h1 font-bold mt-8 mb-8">WELCOME TO MY DEV BLOG</h1>

		<!-- Search and Filter Section -->
		<div class="w-full mb-8 space-y-4">
			<!-- Search Bar -->
			<input
				type="text"
				placeholder="Search posts..."
				bind:value={searchQuery}
				class="w-full p-4 rounded-lg bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 placeholder-surface-400 dark:placeholder-secondary-700 border-2 border-transparent focus:border-surface-500 dark:focus:border-primary-500 outline-none transition-colors"
			/>

			<!-- Tag Filter -->
			<div class="flex flex-wrap gap-2">
				<button
					on:click={() => selectedTag = "all"}
					class="px-4 py-2 rounded-lg transition-all {selectedTag === 'all' ? 'bg-surface-500 dark:bg-primary-500 text-primary-500 dark:text-surface-500' : 'bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 hover:bg-surface-400 dark:hover:bg-surface-800'}"
				>
					All
				</button>
				{#each data.allTags as tag}
					<button
						on:click={() => selectedTag = tag}
						class="px-4 py-2 rounded-lg transition-all {selectedTag === tag ? 'bg-surface-500 dark:bg-primary-500 text-primary-500 dark:text-surface-500' : 'bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 hover:bg-surface-400 dark:hover:bg-surface-800'}"
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
					<a href="/blog/{post.slug}" class="block group">
						<div class="h-full p-6 rounded-lg bg-secondary-500 dark:bg-surface-900 hover:bg-surface-400 dark:hover:bg-surface-800 transition-all">
							<h2 class="h3 font-bold mb-2 text-surface-500 dark:text-primary-500 group-hover:text-surface-600 dark:group-hover:text-primary-400">
								{post.title}
							</h2>

							<div class="flex flex-wrap items-center gap-2 mb-3 text-sm text-surface-400 dark:text-secondary-700">
								<span>{formatDate(post.date)}</span>
								<span>•</span>
								<span>{post.readingTime} min read</span>
							</div>

							{#if post.tags && post.tags.length > 0}
								<div class="flex flex-wrap gap-2 mb-3">
									{#each post.tags as tag}
										<span class="badge bg-surface-500 dark:bg-primary-500 text-primary-500 dark:text-surface-500 px-2 py-1 text-xs">
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
						on:click={() => currentPage = Math.max(1, currentPage - 1)}
						disabled={currentPage === 1}
						class="px-4 py-2 rounded-lg bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-400 dark:hover:bg-surface-800 transition-all"
					>
						Previous
					</button>

					{#each Array(totalPages) as _, i}
						<button
							on:click={() => currentPage = i + 1}
							class="px-4 py-2 rounded-lg transition-all {currentPage === i + 1 ? 'bg-surface-500 dark:bg-primary-500 text-primary-500 dark:text-surface-500' : 'bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 hover:bg-surface-400 dark:hover:bg-surface-800'}"
						>
							{i + 1}
						</button>
					{/each}

					<button
						on:click={() => currentPage = Math.min(totalPages, currentPage + 1)}
						disabled={currentPage === totalPages}
						class="px-4 py-2 rounded-lg bg-secondary-500 dark:bg-surface-900 text-surface-500 dark:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-400 dark:hover:bg-surface-800 transition-all"
					>
						Next
					</button>
				</div>
			{/if}
		{:else}
			<div class="text-center py-16">
				<p class="text-xl text-surface-400 dark:text-secondary-700">No posts found matching your criteria.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	p {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>