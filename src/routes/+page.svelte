<script>
	import { onMount } from "svelte";

    import { LightSwitch, popup, RadioGroup, RadioItem } from "@skeletonlabs/skeleton";

	// gsap
	import { gsap } from "gsap";
	import { TextPlugin } from "gsap/dist/TextPlugin";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

	import Cursor from "../lib/Cursor.svelte";

	// timeline v1 imports [legacy]
	// import Timeline from "../lib/Timeline-old/Timeline.svelte"
	// import TimelineItem from "../lib/Timeline-old/TimelineItem.svelte"

	import TL from "../lib/Timeline.svelte"
	import Contact from "../lib/Contact.svelte"
	import placeholder from "../lib/images/placeholder.png";
	import Scrollable1 from "../lib/Scrollable1.svelte";
	import Scrollable2 from "../lib/Scrollable2.svelte";

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

	// footer logos
	import GitHub from "../lib/icons/GitHub.svelte";
	import Linkedin from "../lib/icons/Linkedin.svelte";

	// gsap plugin registering
	gsap.registerPlugin(TextPlugin);
	gsap.registerPlugin(ScrollTrigger);

	let page = 0;

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

	const projectTitles = ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"];

	let now = new Date();
	let year = now.getFullYear();

	// gsap animations
	onMount(_ => {
		const tl = gsap.timeline({ defaults: { ease: "power1.inOut" }});

		tl.fromTo(".hero-firstname", {text: "", opacity: 0}, { text: "&lt; ARNAV", opacity: 1, duration: 1.5 });
		tl.fromTo(".hero-lastname", {text: "", opacity: 0}, { text: "JAGETIA /&gt;", opacity: 1, duration: 1.5 });
		tl.fromTo(".hero-text1", {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1.5});
		tl.fromTo(".hero-text2", {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1.5, delay: -1});
		tl.fromTo(".hero-text3", {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1.5, delay: -1});


		gsap.set(".about-section", { y: 100, opacity: 0 });
		gsap.set(".skills-section", { y: 100, opacity: 0 });
		gsap.set(".projects-section", { y: 100, opacity: 0 });
		gsap.set(".experience-section", { y: 100, opacity: 0 });
		gsap.set(".contact-section", { y: 100, opacity: 0 });

		gsap.to(".about-section", {opacity: 1, y: 0, duration: 1.5, scrollTrigger: ".about-section"})
		gsap.to(".skills-section", {opacity: 1, y: 0, duration: 1.5, scrollTrigger: ".skills-section"})
		gsap.to(".projects-section", {opacity: 1, y: 0, duration: 1.5, scrollTrigger: ".projects-section"})
		gsap.to(".experience-section", {opacity: 1, y: 0, duration: 1.5, scrollTrigger: ".experience-section"})
		gsap.to(".contact-section", {opacity: 1, y: 0, duration: 1.5, scrollTrigger: ".contact-section"})

		let proxy = { skew: 0 },
			skewSetter = gsap.quickSetter(".project-card", "skewY", "deg"), // fast
			clamp = gsap.utils.clamp(-10, 10); // don't let the skew go beyond 20 degrees. 

		ScrollTrigger.create({
			onUpdate: self => {
				let skew = clamp(self.getVelocity() / -300);
				// only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
				if (Math.abs(skew) > Math.abs(proxy.skew)) {
					proxy.skew = skew;gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
				}
			}
		});
	});
</script>



<!-- custom cursor -->
<Cursor />

<div class="p-8 space-y-8">
    <div class="flex justify-between items-center h-full mx-auto">
		<LightSwitch bgLight="bg-secondary-500" bgDark="bg-surface-900" fillLight="fill-primary-500" />

		<!-- <a class="justify-end" href="/blog">BLOG</a> -->
		<RadioGroup class="justify-end" background="bg-secondary-500 dark:bg-surface-900" active="bg-surface-900 dark:bg-primary-500" color="text-primary-500 dark:text-surface-900">
			<RadioItem bind:group={page} name="justify" value={0}>Portfolio</RadioItem>
			<a href="/blog"><RadioItem bind:group={page} name="justify" value={1}>Blog</RadioItem></a>
		</RadioGroup>
	</div>

    <div class="flex justify-center items-center h-full flex-col mx-auto w-[90%]">
		<!-- LANDING PAGE -->
		<div class="w-full h-screen flex flex-col -translate-y-32 justify-center items-center">
			<h1 class="hero-firstname h1 font-bold title -translate-x-[20%] title">ARNAV</h1>
			<h1 class="hero-lastname h1 mb-40 font-bold title translate-x-[20%] title">JAGETIA</h1>
			<p>
				<span class="hero-text1">FULL-STACK DEVELOPER</span>
				<span class="mx-16 hero-text2">CLOUD ARCHITECT</span>
				<span class="hero-text3">BACHELOR OF ENGINEERING</span>
			</p>

			<!-- aws certifications -->
			<div class="absolute bottom-4 -right-28 w-56">
				<div class="flex flex-row">
					<a href="https://www.credly.com/badges/7e08ab0f-ab35-4596-b6d9-d4bb5f45039f/public_url">
						<img src="../src/lib/images/aws-developer-associate.png" alt="AWS Developer Associate Certification" />
					</a>
					
					<a href="https://www.credly.com/badges/890bf57a-2cac-4be1-9d14-d81201defc6d/public_url">
						<img src="../src/lib/images/aws-cloud-practitioner.png" alt="AWS Cloud Practitioner Certification" />
					</a>
				</div>
			</div>

			<!-- socials -->
			<div class="absolute -right-28 w-10">
				<a class="w-10 mx-4 my-8 dark:fill-primary-500 fill-logosurface dark:hover:fill-primary-400 hover:fill-surface-400" href="https://www.github.com/arnav-exe/"><GitHub /></a>
				<a class="w-10 mx-4 my-8 dark:fill-primary-500 fill-logosurface dark:hover:fill-primary-400 hover:fill-surface-400" href="https://www.linkedin.com/in/arnav-jagetia/"><Linkedin /></a>
			</div>
		</div>

		<!-- scroll indicator svg -->
		<div class="w-8 -translate-y-56">
			<Scrollable1 />
			<br>
			<Scrollable2 />
		</div>

		

		<!-- ABOUT ME -->
		<div class="my-16 about-section">
			<h2 class="h2 font-bold text-center mb-4">ABOUT ME</h2>
			<p class="translate-x-5">Hi, I'm a recent Computer Systems Engineering graduate from QMUL. As a full-stack engineer, I craft sleek, powerful apps with Svelte, JavaScript, Node.js, and Tailwind. I also specialize in machine learning and data analysis using PyTorch, Hadoop, and Spark. Not to mention additional competencies in C, VHDL, and Java</p>
			<p class="translate-x-5">I also excel in architecting resilient and scalable cloud-based solutions using AWS, backed by two AWS certifications: AWS Associate Developer and AWS Cloud Practitioner.</p>
		</div>



		<!-- SKILLS -->
		<div class="my-16 skills-section">
			<h2 class="h2 font-bold text-center mb-4">SKILLS</h2>
			<div class="flex justify-center items-center h-full flex-row">
				<!-- single row of LOGOS of all languages/frameworks HERE: -->
				{#each logos as [name, logo]}
					<div class="min-w-[75%] mx-[20%]">
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
		<div class="my-16 projects-section">
			<h2 class="h2 font-bold text-center mb-4">PROJECTS</h2>

			<!-- glass project cards -->
			<!-- TODO: ADD GLASS OVERLAY EFFECT TO PROJECT THUMBNAILS -->
			<div class="grid grid-cols-2 gap-8 justify-items-center items-center">
				{#each projectTitles as project}
					<div class="project-card block card card-hover p-4 max-w-[50%] bg-secondary-500 dark:bg-surface-900">
						<a href="https://github.com/">
							<img src="{placeholder}" class="max-w-[100%]" alt="project {project + 1} card" />
							<div class="grid grid-cols-subgrid gap-4">
								<p class="text-center font-bold mt-4">{project}</p>
								<p class="text-left mb-4">This section should be used to provide a brief overview of the project</p>
							</div>
						</a>
					</div>
				{/each}
			</div>
		</div>

		<!-- EXPERIENCE -->
		<div class="my-16 experience-section">
			<h2 class="h2 font-bold text-center mb-4">EXPERIENCE</h2>
			<!-- Timeline v1 -->
			<!-- <Timeline>
				<TimelineItem
					title="Lead front-end developer @ DSEU"
					startDate="July 2022"
					endDate="September 2022"
					description="Designed and developed online marketplace bbmart.in. Used HTML, CSS, JS, jQuery, Bootstrap to a create a fluid app with a modern design, responsive on all platforms; Led a team of 10+ content writers."
					badgeText="Latest"
				/>

				<TimelineItem
					title="Automation developer @ Tiltlabs"
					startDate="June 2022"
					endDate="August 2022"
					description="Developed internal automation tools and macros in Python (OpenCV, Pynput, Pillow) to speed up Illustrator workflows and enable batch rendering; designed NFT assets for a client limoverse.io and game assets for blockchain based farm game in Photoshop and Illustrator."
				/>

				<TimelineItem
					title="Front-end developer @ LBR Technology"
					startDate="November 2021"
					endDate="July 2022"
					description="Designed a responsive corporate website for lithium battery recycling company; used HTML, CSS, JS and Bootstrap for the front-end, SQL for the back-end; Adobe Illustrator, Photoshop and DaVinci Resolve for images, graphics, logos and animation."
				/>

				<TimelineItem
					title="Intern @ Rightbot"
					startDate="November 2021"
					endDate="May 2022"
					description="Application of AI in the field of warehouse automation; produced field reports on use of robotics technology, competing company profiles and investment profiles."
				/>
				
				<TimelineItem
					title="Intern @ Daiko FHO"
					startDate="August 2020"
					endDate="November 2020"
					description="Worked for clients Gourmet Passport and Wattpad; designed digital adverts and posters that were used by the client for digital advertising using Adobe Photoshop and Adobe Illustrator."
				/>
				</Timeline> -->

			<!-- Timeline v2 -->
			<TL />
		</div>

		<!-- CONTACT -->
		<div class="mt-16 mb-32 contact-section">
			<h2 class="h2 font-bold text-center mb-4">CONTACT ME</h2>

			<Contact />
		</div>
    </div>
</div>

<!-- FOOTER -->
<div class="w-full h-56 bg-secondary-500 dark:bg-surface-900">
	<div class="flex justify-center items-center flex-col">
		<div class="flex justify-center flex-row">
			<a class="w-10 mx-4 my-8 dark:fill-primary-500 fill-logosurface dark:hover:fill-primary-400 hover:fill-surface-400" href="https://www.github.com/arnav-exe/"><GitHub /></a>
			<a class="w-10 mx-4 my-8 dark:fill-primary-500 fill-logosurface dark:hover:fill-primary-400 hover:fill-surface-400" href="https://www.linkedin.com/in/arnav-jagetia/"><Linkedin /></a>
		</div>
		<p class="mb-8">Forged in the heart of a dying star using <a class="underline" href="https://kit.svelte.dev/">SvelteKit</a>, <a class="underline" href="https://tailwindcss.com/">Tailwind</a>, and <a class="underline " href="https://www.skeleton.dev/">SkeletonUI</a></p>
		<p>© Arnav Jagetia {year}</p>
	</div>
</div>


<style>
	.title {
		font-size: 10vw;
	}

	/* make font slightly bigger */
	:global(p) {
		font-size: 1.25rem;
		line-height: normal;
	}
</style>