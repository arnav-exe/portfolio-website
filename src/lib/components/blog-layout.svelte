<script>
    export let title = "Blog Post";
    export let description = "";
    export let date = "";
    export let tags = [];
    export let readingTime = 0;

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
</script>

<svelte:head>
    <title>{title} - Arnav Jagetia</title>
</svelte:head>

<main class="p-8 w-full overflow-x-hidden">
    <div class="max-w-4xl mx-auto">
        <!-- Back button -->
        <a href="/blog" class="inline-flex items-center mb-8 text-surface-500 hover:text-surface-400 dark:text-primary-500 dark:hover:text-primary-400 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Blog
        </a>

        <!-- Article header -->
        <article class="prose prose-lg max-w-none">
            <header class="mb-8">
                <h1 class="h1 font-bold mb-4">{title}</h1>

                {#if description}
                    <p class="text-xl mb-4 text-surface-400 dark:text-secondary-700">{description}</p>
                {/if}

                <div class="flex flex-wrap items-center gap-4 text-sm text-surface-400 dark:text-secondary-700">
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
                            <span class="badge bg-secondary-500 dark:bg-tertiary-500 text-surface-500 dark:text-primary-500 px-3 py-1">
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
    :global(.blog-content h2) {
        font-size: 1.875rem;
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: rgb(17 17 17);
    }

    :global(.blog-content h3) {
        font-size: 1.5rem;
        font-weight: 700;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        color: rgb(17 17 17);
    }

    :global(.blog-content p) {
        margin-bottom: 1rem;
        color: rgb(88 88 88);
        line-height: 1.75;
    }

    :global(.blog-content ul, .blog-content ol) {
        margin-bottom: 1rem;
        margin-left: 1.5rem;
        color: rgb(88 88 88);
    }

    :global(.blog-content li) {
        margin-bottom: 0.5rem;
    }

    :global(.blog-content code) {
        background-color: rgb(212 201 174);
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
    }

    :global(.blog-content pre) {
        background-color: rgb(212 201 174);
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin-bottom: 1rem;
    }

    :global(.blog-content pre code) {
        background-color: transparent;
        padding: 0;
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

    :global(.blog-content img) {
        border-radius: 0.5rem;
        margin: 1rem 0;
    }

    /* Dark mode styles */
    :global([data-theme='minimalist'].dark .blog-content h2),
    :global([data-theme='minimalist'].dark .blog-content h3) {
        color: rgb(237 229 209);
    }

    :global([data-theme='minimalist'].dark .blog-content p),
    :global([data-theme='minimalist'].dark .blog-content ul),
    :global([data-theme='minimalist'].dark .blog-content ol) {
        color: rgb(159 151 131);
    }

    :global([data-theme='minimalist'].dark .blog-content code) {
        background-color: rgb(8 8 8);
    }

    :global([data-theme='minimalist'].dark .blog-content pre) {
        background-color: rgb(8 8 8);
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
</style>
