<script>
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	// which tab the current page is: 0 = portfolio, 1 = blog, 2 = chat
	export let active = 0;

	let group = active;
</script>

<RadioGroup
	background="bg-secondary-500 dark:bg-surface-900"
	active="bg-surface-900 dark:bg-primary-500"
	color="text-primary-500 dark:text-surface-900"
>
	{#if active === 0}
		<RadioItem bind:group value={0}>Portfolio</RadioItem>
	{:else}
		<a href="/"><RadioItem bind:group value={0}>Portfolio</RadioItem></a>
	{/if}
	{#if active === 1}
		<RadioItem bind:group value={1}>Blog</RadioItem>
	{:else}
		<a href="/blog"><RadioItem bind:group value={1}>Blog</RadioItem></a>
	{/if}
	{#if active === 2}
		<RadioItem bind:group value={2}>Chat ✨</RadioItem>
	{:else}
		<a href="/chat">
			<RadioItem bind:group value={2}>Chat ✨</RadioItem>
		</a>
	{/if}
</RadioGroup>
