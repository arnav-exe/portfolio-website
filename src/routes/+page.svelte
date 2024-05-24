<script>
    import { LightSwitch } from "@skeletonlabs/skeleton"

	import Cursor from "../lib/Cursor.svelte";
</script>

<Cursor />

<div class="p-8 space-y-8">
    <div class="flex justify-between items-center h-full mx-auto">
    <LightSwitch />

	<a class="justify-end" href="/blog">BLOG</a>
	</div>

    <div class="flex justify-center items-center h-full flex-col mx-auto max-w-[90%]">
		<!-- LANDING PAGE -->
		<div>
			<h1 class="h1 -translate-x-24 title">ARNAV</h1>
			<h1 class="h1 translate-x-24 title">JAGETIA</h1>
		</div>

		<!-- ABOUT ME -->
		<div>
			<h1 class="h1">ABOUT ME</h1>
			<p>Hi, I'm a recent Computer Systems Engineering graduate from QMUL. As a full-stack engineer, I craft sleek, powerful apps with Svelte, JavaScript, Node.js, and Tailwind. I also specialize in machine learning and data analysis using PyTorch, Hadoop, and Spark. Not to mention additional competencies in C, VHDL, and Java</p>
			<p>I also excel in architecting resilient and scalable cloud-based solutions using AWS, backed by two AWS certifications: AWS Associate Developer and AWS Cloud Practitioner.</p>
		</div>

		<!-- SKILLS -->
		<div>
			<h1 class="h1">SKILLS</h1>
			<!-- single row of logos of all languages/frameworks I am proficient in -->
		</div>

		<!-- PROJECTS -->
		<div>
			<h1 class="h1">PROJECTS</h1>
		</div>

		<!-- EXPERIENCE -->
		<div>
			<h1 class="h1">EXPERIENCE</h1>
		</div>

		<!-- CONTACT -->
		<div>
			<h1 class="h1">CONTACT ME</h1>
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

<style>
	.title  {
		font-size: 15rem;
	}
</style>