<script>
	import '../app.postcss';

	// logos for footer
	import GitHub from "../lib/icons/GitHub.svelte";
	import Linkedin from "../lib/icons/Linkedin.svelte";

	// fetch current year
	let year = new Date().getFullYear();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<slot />

<!-- FOOTER -->
<div class="w-full h-56 bg-secondary-500 dark:bg-surface-500">
	<div class="flex justify-center items-center flex-col">
		<div class="flex justify-center flex-row">
			<a class="w-10 mx-4 my-8 dark:fill-primary-500 fill-logosurface dark:hover:fill-primary-400 hover:fill-surface-400" href="https://www.github.com/arnav-exe/"><GitHub /></a>
			<a class="w-10 mx-4 my-8 dark:fill-primary-500 fill-logosurface dark:hover:fill-primary-400 hover:fill-surface-400" href="https://www.linkedin.com/in/arnav-jagetia/"><Linkedin /></a>
		</div>
		<p class="mb-8 text-center">Forged in the heart of a dying star using <a class="underline" href="https://kit.svelte.dev/">SvelteKit</a>, <a class="underline" href="https://tailwindcss.com/">Tailwind</a>, <a class="underline " href="https://www.skeleton.dev/">SkeletonUI</a>, and <a class="underline " href="https://gsap.com/">gsap</a></p>
		<p>© Arnav Jagetia {year}</p>
	</div>
</div>
