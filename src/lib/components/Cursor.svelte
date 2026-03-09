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

	// spring for border radius transitions
	let borderRadius = spring(999, {
		stiffness: 0.2,
		damping: 0.6
	});

	let isHovering = false;
	const interactableTags = [
		'a',
		'button',
		'path',
		'rect',
		'circle',
		'svg',
		'polygon',
		'label',
		'span',
		'input'
	];

	const isInteractable = (element) => {
		if (element?.closest?.('[data-cursor-static]')) {
			return false;
		}

		// check element and up to 3 parents for interactable tags
		let current = element;
		for (let i = 0; i < 4 && current; i++) {
			if (current.tagName && interactableTags.includes(current.tagName.toLowerCase())) {
				return true;
			}
			// check if element has pointer cursor or is clickable
			if (current.style && window.getComputedStyle(current).cursor === 'pointer') {
				return true;
			}
			current = current.parentElement;
		}
		return false;
	};

	const cursorMorph = (event) => {
		const hovering = isInteractable(event.target);
		isHovering = hovering;
		borderRadius.set(hovering ? 0 : 999);
	};

	onMount((_) => {
		window.addEventListener('mousemove', cursorMorph);

		return (_) => {
			window.removeEventListener('mousemove', cursorMorph);
		};
	});
</script>

<svelte:window
	on:mousemove={(e) => {
		coords1.set({ x: e.clientX, y: e.clientY });
		coords2.set({ x: e.clientX, y: e.clientY });
	}}
	on:mousedown={(_) => {
		size.set(30);
	}}
	on:mouseup={(_) => {
		size.set(15);
	}}
/>

<svg
	class="cc w-full h-full z-50 fixed pointer-events-none fill-surface-500 stroke-surface-500 dark:fill-primary-500 dark:stroke-primary-500"
>
	<rect
		x={$coords1.x - $size}
		y={$coords1.y - $size}
		width={Math.max(0, $size * 2)}
		height={Math.max(0, $size * 2)}
		rx={Math.max(0, $borderRadius)}
		ry={Math.max(0, $borderRadius)}
		stroke-width="1"
		fill-opacity="0"
	/>
	<rect
		x={$coords2.x - $size / 4}
		y={$coords2.y - $size / 4}
		width={Math.max(0, $size / 2)}
		height={Math.max(0, $size / 2)}
		rx={Math.max(0, $borderRadius)}
		ry={Math.max(0, $borderRadius)}
	/>

	<!-- original custom cursor (2 concentric circles) -->
	<!-- <circle cx={$coords1.x} cy={$coords1.y} r={$size} stroke-width="1" fill-opacity="0"/>
	<circle cx={$coords2.x} cy={$coords2.y} r={$size / 4} /> -->
</svg>

<style>
	:global(*) {
		cursor: none !important;
	}

	/* hide cursor if user is on mobile */
	@media (hover: none) and (pointer: coarse) {
		.cc {
			display: none;
		}

		:global(*) {
			cursor: auto !important;
		}
	}
</style>
