<script>
	import { LightSwitch, RadioGroup, RadioItem } from "@skeletonlabs/skeleton"

	import Cursor from "../../lib/Cursor.svelte";

	let page = 1;
</script>



<!-- custom cursor -->
<Cursor />

<div class="p-8 space-y-8">
	<div class="z-0 relative flex justify-between items-center m-0 start-0">
		<LightSwitch bgLight="bg-secondary-500" fillLight="fill-primary-500" />

			<div class="-z-50 absolute w-full flex justify-center items-center">
				<a href="/"> <!-- links back to homepage -->
					<svg class="w-8 fill-surface-500 dark:fill-primary-500" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 1879.55"><polygon points="1085.04 0.2 957.42 221.26 957.3 221.05 1084.92 0 1085.04 0.2"/><polygon points="2042.46 1658.5 1914.84 1879.55 1914.63 1879.19 2042.25 1658.14 2042.46 1658.5"/><polygon points="3000 0.58 2872.38 221.63 2871.63 221.63 2042.25 1658.14 1914.63 1879.19 1787.01 1658.14 1085.05 442.31 255.25 1879.55 0 1879.55 957.42 221.26 1085.04 0.2 1212.66 221.26 1914.63 1437.1 2616.38 221.63 1978.65 221.63 1978.65 0.58 3000 0.58"/><polygon points="1212.79 221.05 1212.66 221.26 1085.04 0.2 1085.16 0 1212.79 221.05"/><polygon points="1914.63 1879.19 1914.42 1879.55 1786.8 1658.5 1787.01 1658.14 1914.63 1879.19"/><polygon points="2744.67 0.58 2744 0.58 2744.34 0 2744.67 0.58"/></svg>
				</a>
			</div>

		<RadioGroup class="justify-end" background="bg-secondary-500 dark:bg-surface-900" active="bg-surface-900 dark:bg-primary-500" color="text-primary-500 dark:text-surface-900">
			<a href="/"><RadioItem bind:group={page} value={0}>Portfolio</RadioItem></a>
			<RadioItem bind:group={page} value={1}>Blog</RadioItem>
		</RadioGroup>
	</div>

	<div class="flex justify-center items-center h-full flex-col mx-auto w-[90%]">

		<h1 class="h1 font-bold mt-8 mb-16">WELCOME TO MY DEV BLOG</h1>

		<div class="divide-y-2 divide-solid divide-logosurface dark:divide-logoprimary" href="www.example.com">
			
			<a href="/blog" class="w-full h-80"> <!-- LINK TO MDSVEX BLOG FILE -->
				<div class="p-4 hover:bg-logoprimary transition-all hover:dark:bg-logosurface">
					<h2 class="h2">Why you should learn Svelte instead of React.js in 2024</h2>
					
					<p class="m-2">21/08/2024</p>
					<p>Svelte was voted most loved framework in 2021, and has remained at the top ever since. Here is why I believe Svelte should be a part of your arsenal as a web developer.</p>
				</div>
			</a>
			
			<div class="w-full h-80">
				<a href="www.example.com">
					<div></div>
				</a>
			</div>

			<!-- <div class="w-full h-80 bg-blue-300">
				<a href="example.com">
					<div></div>
				</a>
			</div> -->
		</div>
		
	</div>

</div>



<style>
	p {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>