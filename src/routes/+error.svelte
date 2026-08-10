<script>
	import { page } from '$app/stores';
	import Cursor from '$lib/components/Cursor.svelte';

	const oneLiners = [
		"Page not found. Confidence: 97.3%.",
		"Don't worry. A VC is already raising $50M to fix this.",
        "Test suite said 94% pass. Looks like you found the other 6%",
		"Deadline moved up because of AI. This page didn't make the sprint.",
        "Quantized slightly too aggressively.",
        "Deprecated. Please migrate to /.",
        "Early stopping kicked in just before this page.",
        "Softmaxed to zero.",
        "The gradient vanished, and so did the page.",
        "Evicted from the KV cache.",
	];

	const oneLiner = oneLiners[Math.floor(Math.random() * oneLiners.length)];
</script>

<svelte:head>
	<title>{$page.status} | Arnav Jagetia</title>
</svelte:head>

<Cursor />

<div class="min-h-[75vh] flex flex-col items-center justify-center px-8 text-center gap-6">

	<h1 class="text-[20vw] font-bold leading-none tracking-tight">
		{$page.status}
	</h1>

	<h2 class="h2 font-bold flex items-center gap-8 whitespace-nowrap w-full max-w-2xl
		before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15
		after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15">
		PAGE NOT FOUND
	</h2>

	<p class="dark:text-primary-700 max-w-2xl text-lg">
		{oneLiner}
	</p>

	<a href="/"
		class="mt-4 px-8 py-3 border border-primary-500/30 hover:border-primary-500/60
		transition-colors duration-150 tracking-[0.2em] text-sm uppercase">
		Return Home
	</a>

</div>
