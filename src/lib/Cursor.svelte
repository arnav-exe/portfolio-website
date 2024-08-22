<script>
	import { spring } from 'svelte/motion';

	let coords1 = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.05,
			damping: 0.25
		}
	);

	let coords2 = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.9,
			damping: 0.9
		}
	);

	let size = spring(15);
</script>



<svelte:window
	on:mousemove={(e) => {
		coords1.set({ x: e.clientX, y: e.clientY })
		coords2.set({ x: e.clientX, y: e.clientY })
	}}
	on:mousedown={(e) => {
		size.set(30);
	}}
	on:mouseup={(e) => {
		size.set(15);
	}}
/>

<svg
	class="w-full h-full z-50 fixed pointer-events-none fill-surface-500 stroke-surface-500 dark:fill-primary-500 dark:stroke-primary-500"
>
	<circle cx={$coords1.x} cy={$coords1.y} r={$size} stroke-width="1" fill-opacity="0"/>
	<circle cx={$coords2.x} cy={$coords2.y} r={$size / 4} />
</svg>

<style>
	:global(body), :global(body):hover,
	:global(a), :global(button), :global(input), :global(select), :global(textarea) {
		cursor: none !important;
	}
</style>
