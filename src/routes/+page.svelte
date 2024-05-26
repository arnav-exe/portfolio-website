<script>
    import { LightSwitch } from "@skeletonlabs/skeleton"

	import Cursor from "../lib/Cursor.svelte";
	import Svelte from "../lib/icons/Svelte.svelte";
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
			<h1 class="h1 font-bold title -translate-x-24 title">ARNAV</h1>
			<h1 class="h1 font-bold title translate-x-24 title">JAGETIA</h1>
		</div>

		<!-- ABOUT ME -->
		<div>
			<h2 class="h2 font-bold">ABOUT ME</h2>
			<p class="newred">Hi, I'm a recent Computer Systems Engineering graduate from QMUL. As a full-stack engineer, I craft sleek, powerful apps with Svelte, JavaScript, Node.js, and Tailwind. I also specialize in machine learning and data analysis using PyTorch, Hadoop, and Spark. Not to mention additional competencies in C, VHDL, and Java</p>
			<p>I also excel in architecting resilient and scalable cloud-based solutions using AWS, backed by two AWS certifications: AWS Associate Developer and AWS Cloud Practitioner.</p>
		</div>


		<!-- SKILLS -->
		<div>
			<h2 class="h2 font-bold">SKILLS</h2>
			<div class="flex justify-center items-center h-full flex-row">
				<!-- single row of logos of all languages/frameworks HERE: -->
				<Svelte />
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

<style>
	.title {
		font-size: 10vw;
	}

	/* p {
		font-size: 1.5vw;
		line-height: normal;
	} */
</style>