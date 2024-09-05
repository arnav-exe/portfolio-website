<script>
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';

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


	let isHovering = false;
	const interactableTags = ['a', 'button', "img", "path", "rect", "circle"];

	const isInteractable = e => {
		return interactableTags.includes(e.toLowerCase());
	}

	const cursorMorph = event => {
		isHovering = isInteractable(event.target.tagName);
	}

	onMount(_ => {
		window.addEventListener('mousemove', cursorMorph);

		return _ => {
			window.removeEventListener('mousemove', cursorMorph);
		};
	})
</script>



<svelte:window
	on:mousemove={e => {
		coords1.set({ x: e.clientX, y: e.clientY })
		coords2.set({ x: e.clientX, y: e.clientY })
	}}
	on:mousedown={_ => {
		size.set(30);
	}}
	on:mouseup={_ => {
		size.set(15);
	}}
/>

<svg class="cc w-full h-full z-50 fixed pointer-events-none fill-surface-500 stroke-surface-500 dark:fill-primary-500 dark:stroke-primary-500">
	<rect
		class="morph"
		x={$coords1.x - $size}
		y={$coords1.y - $size}
		width={$size * 2}
		height={$size * 2}
		rx={isHovering ? 0 : $size}
		ry={isHovering ? 0 : $size}
		stroke-width="1"
		fill-opacity="0"
	/>
	<rect
		class="morph"
		x={$coords2.x - $size / 4}
		y={$coords2.y - $size / 4}
		width={$size / 2}
		height={$size / 2}
		rx={isHovering ? 0 : $size / 4}
		ry={isHovering ? 0 : $size / 4}
	/>

	<!-- original custom cursor (2 concentric circles) -->
	<!-- <circle cx={$coords1.x} cy={$coords1.y} r={$size} stroke-width="1" fill-opacity="0"/>
	<circle cx={$coords2.x} cy={$coords2.y} r={$size / 4} /> -->
</svg>

<style>
	:global(body), :global(body):hover,
	:global(a), :global(button), :global(input), :global(select), :global(textarea) {
		cursor: none !important;
	}

	.morph {
		transition: rx 0.3s, ry 0.3s;
	}

	/* hide cursor if user is on mobile or touch-based device */
	@media (hover: none) and (pointer: coarse) {
		.cc {
			display: none;
		}
	}
</style>
