<script>
    import { LightSwitch, popup } from "@skeletonlabs/skeleton";

	import Cursor from "../lib/Cursor.svelte";
	import placeholder from "../lib/images/placeholder.png"

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

<!-- CURSOR BROKEN -->
<!-- <Cursor /> -->

<div class="p-8 space-y-8">
    <div class="flex justify-between items-center h-full mx-auto">
    <LightSwitch />

	<a class="justify-end" href="/blog">BLOG</a>
	</div>

    <div class="flex justify-center items-center h-full flex-col mx-auto w-[90%]">
		<!-- LANDING PAGE -->
		<div>
			<h1 class="h1 font-bold title -translate-x-[10%] title">ARNAV</h1>
			<h1 class="h1 font-bold title translate-x-[10%] title">JAGETIA</h1>
		</div>

		<!-- ABOUT ME -->
		<div>
			<div class="my-16">
				<h2 class="h2 font-bold">ABOUT ME</h2>
				<p class="newred">Hi, I'm a recent Computer Systems Engineering graduate from QMUL. As a full-stack engineer, I craft sleek, powerful apps with Svelte, JavaScript, Node.js, and Tailwind. I also specialize in machine learning and data analysis using PyTorch, Hadoop, and Spark. Not to mention additional competencies in C, VHDL, and Java</p>
				<p>I also excel in architecting resilient and scalable cloud-based solutions using AWS, backed by two AWS certifications: AWS Associate Developer and AWS Cloud Practitioner.</p>
			</div>


			<!-- SKILLS -->
			<div class="my-16">
				<h2 class="h2 font-bold">SKILLS</h2>
				<div class="flex justify-center items-center h-full flex-row">
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
			<div class="my-16">
				<h2 class="h2 font-bold">PROJECTS</h2>
				<!-- glass project cards -->
				<div class="grid grid-cols-2 gap-8 m-8">
					{#each {length: 5} as _, i}
						<div class="card card-hover overflow-hidden max-w-2xl aspect-auto">
							<button>
								<span class="flex flex-row bg-glass-glass-primary dark:variant-glass-surface">
									<img src="{placeholder}" class="w-6/12 aspect-[16/9] h-auto object-cover" alt="project {i + 1} card" />
									<div>
									<p class="mx-4"><strong>Project {i + 1} description</strong></p>
									<p class="text-left mx-4">This section should be used to provide a brief overview of the project</p>
									</div>
								</span>
							</button>
						</div>
					{/each}
				</div>
			</div>

			<!-- EXPERIENCE -->
			<div class="my-16">
				<h2 class="h2 font-bold">EXPERIENCE</h2>
			</div>

			<!-- CONTACT -->
			<div class="my-16">
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

	/* BIGGER font (idk if needed) */
	/* p {
		font-size: 1.5vw;
		line-height: normal;
	} */
</style>