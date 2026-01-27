<script>
	import BlogLayout from "$lib/components/blog-layout.svelte";
	import Cursor from "$lib/components/Cursor.svelte";

	export let data;
</script>

<!-- custom cursor -->
<Cursor />

<BlogLayout
	title={data.metadata.title}
	description={data.metadata.description}
	date={data.metadata.date}
	tags={data.metadata.tags || []}
	readingTime={data.readingTime}
>
	<svelte:component this={data.content} />
</BlogLayout>
