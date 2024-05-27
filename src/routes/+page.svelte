<script>
    import { LightSwitch, popup } from "@skeletonlabs/skeleton"

	import Cursor from "../lib/Cursor.svelte";
	
	// skills logos
	import Svelte from "../lib/icons/Svelte.svelte";
	import Node from "../lib/icons/Node.svelte";
	import js from "../lib/icons/JS.Svelte";
	import Tailwind from "../lib/icons/Tailwind.svelte";
	import Python from "../lib/icons/Python.svelte";
	import Pytorch from "../lib/icons/Pytorch.svelte";
	import Pandas from "../lib/icons/Pandas.svelte";
	import aws from "../lib/icons/AWS.svelte";
	import Git from "../lib/icons/Git.svelte";

	const logos = new Map([
		["Svelte", Svelte],
		["Node.js", Node],
		["JavaScript", js],
		["Tailwind CSS", Tailwind],
		["Python", Python],
		["PyTorch", Pytorch],
		["Pandas", Pandas],
		["AWS", aws],
		["Git", Git]
	]);
</script>

<Cursor />

<div class="p-8 space-y-8">
    <div class="flex justify-between items-center h-full mx-auto">
    <LightSwitch />

	<a class="justify-end" href="/blog">BLOG</a>
	</div>

    <div class="flex justify-center items-center h-full flex-col mx-auto w-[90%]">
		<!-- LANDING PAGE -->
		<div>
			<h1 class="h1 font-bold title -translate-x-24 title">ARNAV</h1>
			<h1 class="h1 font-bold title translate-x-24 title">JAGETIA</h1>
		</div>

		<!-- ABOUT ME -->
		<div>
			<div>
				<h2 class="h2 font-bold">ABOUT ME</h2>
				<p class="newred">Hi, I'm a recent Computer Systems Engineering graduate from QMUL. As a full-stack engineer, I craft sleek, powerful apps with Svelte, JavaScript, Node.js, and Tailwind. I also specialize in machine learning and data analysis using PyTorch, Hadoop, and Spark. Not to mention additional competencies in C, VHDL, and Java</p>
				<p>I also excel in architecting resilient and scalable cloud-based solutions using AWS, backed by two AWS certifications: AWS Associate Developer and AWS Cloud Practitioner.</p>
			</div>


			<!-- SKILLS -->
			<div>
				<h2 class="h2 font-bold">SKILLS</h2>
				<div class="flex justify-center items-center w-screen h-full flex-row">
					<!-- single row of LOGOS of all languages/frameworks HERE: -->
					{#each logos as [name, logo]}
						<div class="w-[10%] mx-[2.5%]">
							<!-- skill logo -->
							<div use:popup={{ event: 'hover', target: 'popupHover-' + name, placement: 'bottom' }}>
								<svelte:component this={logo} />
							</div>
						</div>
						<!-- toolip -->
						<div class="card p-4 variant-filled-secondary dark:variant-filled-tertiary" data-popup="popupHover-{name}">
							<p class="text-center text-surface-500 dark:text-primary-500">{name}</p>
							<div class="arrow variant-filled-secondary dark:variant-filled-tertiary" />
						</div>
					{/each}
				</div>
			</div>

			<!-- PROJECTS -->
			<div>
				<h2 class="h2 font-bold">PROJECTS</h2>
			</div>

			<!-- EXPERIENCE -->
			<div>
				<h2 class="h2 font-bold">EXPERIENCE</h2>
			</div>

			<!-- CONTACT -->
			<div>
				<h2 class="h2 font-bold">CONTACT ME</h2>
			</div>

			<!-- FOOTER -->
			<div>
				<!-- things to put in footer: -->
				<!-- all my socials (github, linkedin, email?) -->
				<!-- made with :heart: using svelte, SkeletonUI and Tailwind -->
				<!-- copyright @me? -->
				<!-- funny quote? -->
			</div>
		</div>
    </div>
</div>

<style>
	.title {
		font-size: 10vw;
	}

	/* p {
		font-size: 1.5vw;
		line-height: normal;
	} */
</style>