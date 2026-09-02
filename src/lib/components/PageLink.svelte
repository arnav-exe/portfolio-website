<script>
	import { MoveLeft, MoveRight } from 'lucide-svelte';

	export let href;
	export let direction = 'back';
	let className = '';
	export { className as class };
</script>

<a
	{href}
	class="inline-flex items-center pb-0.5 border-b border-transparent text-surface-500 hover:text-surface-400 dark:text-primary-500 dark:hover:text-primary-400 hover:border-current transition-colors {className}"
>
	{#if direction === 'back'}
		<MoveLeft class="w-5 h-5 mr-2" />
	{/if}
	<slot />
	{#if direction === 'forward'}
		<MoveRight class="w-5 h-5 ml-2" />
	{/if}
</a>
