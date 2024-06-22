<script>
	import { spring } from 'svelte/motion';

	let tempX = 0;
	let tempY = 0;
	let tempScrollY = 0;

	const updateCursor = _ => {
		coords1.set({x: tempX, y: tempY + tempScrollY});
		coords2.set({x: tempX, y: tempY + tempScrollY});
	}

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
		tempX = e.clientX;
		tempY = e.clientY;
		updateCursor();
	}}
	on:mousedown={(e) => {
		size.set(30);
	}}
	on:mouseup={(e) => {
		size.set(15);
	}}
	on:scroll={(e) => {
		tempScrollY = window.scrollY;
		updateCursor();
	}}
/>

<svg
	class="w-full h-full fixed fill-surface-500 stroke-surface-500 dark:fill-primary-500 dark:stroke-primary-500"
>
	<circle cx={$coords1.x} cy={$coords1.y} r={$size} stroke-width="1" fill-opacity="0"/>
	<circle cx={$coords2.x} cy={$coords2.y} r={$size / 4} />
</svg>

<style>
	:global(body) {
		cursor: none;
	}
</style>