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

	function updateCoords(e) {
		const x = e.clientX + window.scrollX;
		const y = e.clientY + window.scrollY;
		coords1.set({ x, y });
		coords2.set({ x, y });
	}
</script>

<svelte:window
	on:mousemove={updateCoords}
	on:mousedown={() => size.set(30)}
	on:mouseup={() => size.set(15)}
/>

<svg
	class="w-full h-full fill-surface-500 stroke-surface-500 dark:fill-primary-500 dark:stroke-primary-500"
>
	<circle cx={$coords1.x} cy={$coords1.y} r={$size} stroke-width="1" fill-opacity="0"/>
	<circle cx={$coords2.x} cy={$coords2.y} r={$size / 4} />
</svg>

<style>
	:global(body) {
		cursor: none;
	}
	
	svg {
		position: fixed;
		top: 0;
		left: 0;
		pointer-events: none;
		width: 100vw;
		height: 100vh;
	}
</style>
