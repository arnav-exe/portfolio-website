<script>
	import { onMount } from "svelte";

    import { popup, RadioGroup, RadioItem } from "@skeletonlabs/skeleton";

	// gsap
	import { gsap } from "gsap";
	import { TextPlugin } from "gsap/dist/TextPlugin";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

	import Cursor from "../lib/components/Cursor.svelte";

	// timeline v1 imports [legacy]
	// import Timeline from "../lib/Timeline-old/Timeline.svelte"
	// import TimelineItem from "../lib/Timeline-old/TimelineItem.svelte"

	import TL from "../lib/components/Timeline.svelte"
	import Contact from "../lib/components/Contact.svelte"
	import Mouse from "../lib/components/Mouse.svelte";
	import DownChevron from "../lib/components/DownChevron.svelte";

	// imgs
	import placeholder from "../lib/images/placeholder.png";
	import developer from "../lib/images/developer.png";
	import practitioner from "../lib/images/practitioner.png";
	
	import CssbattleMinifier from "../lib/icons/projects/cssbattle-minifier.svelte";
	import NewsPlatform from "../lib/icons/projects/news-platform.svelte";
	import Polyboard from "../lib/icons/projects/polyboard.svelte";
	import PortfolioWebsite from "../lib/icons/projects/portfolio-website.svelte";
	import RedditToVideo from "../lib/icons/projects/reddit-to-video.svelte";

	// skills logos
	import Svelte from "../lib/icons/Svelte.svelte";
	import Node from "../lib/icons/Node.svelte";
	import JSLogo from "../lib/icons/JSLogo.svelte"
	import Tailwind from "../lib/icons/Tailwind.svelte";
	import Python from "../lib/icons/Python.svelte";
	import Pytorch from "../lib/icons/Pytorch.svelte";
	import Pandas from "../lib/icons/Pandas.svelte";
	import aws from "../lib/icons/AWS.svelte";
	import Git from "../lib/icons/Git.svelte";

	// socials logos
	import GitHub from "../lib/icons/GitHub.svelte";
	import Linkedin from "../lib/icons/Linkedin.svelte";

	// gsap plugin registering
	gsap.registerPlugin(TextPlugin);
	gsap.registerPlugin(ScrollTrigger);

	let page = 0;

	const logos = [
		["Svelte", Svelte, "https://svelte.dev/"],
		["Node.js", Node, "https://nodejs.org/"],
		["JavaScript", JSLogo, "https://v8.dev/"],
		["Tailwind CSS", Tailwind, "https://tailwindcss.com/"],
		["Python", Python, "https://www.python.org/"],
		["PyTorch", Pytorch, "https://pytorch.org/"],
		["Pandas", Pandas, "https://pandas.pydata.org/"],
		["AWS", aws, "https://aws.amazon.com/"],
		["Git", Git, "https://git-scm.com/"]
	];

	const imgs = [NewsPlatform, PortfolioWebsite, CssbattleMinifier, Polyboard, RedditToVideo];

	const projects = [
		{
			title: "AI-Powered News Platform",
			description: "A responsive, modern news platform that leverages Natural Language Processing (NLP) to deliver high-quality article summaries to readers, allowing them to get up-to-date on current affairs in a fraction of the time",
			link: "https://github.com/arnav-exe/ai-news-platform"
		},
		{
			title: "Portfolio Website",
			description: "My revamped portfolio website built using SvelteKit, TailwindCSS, SkeletonUI and gsap",
			link: "https://github.com/arnav-exe/portfolio-website"
		},
		{
			title: "CSSBattle Minifier",
			description: "A Python script built to intelligently minify your code for the online code golfing game CSSBattle.dev",
			link: "https://github.com/arnav-exe/cssbattle-minifier"
		},
		{
			title: "Polyboard - Multiple Clipboards",
			description: "A lightweight Python applet that provides the user with upto 10 additional clipboards to store/retrieve text-based data from",
			link: "https://github.com/arnav-exe/polyboard"
		},
		{
			title: "Reddit Post-to-Video Creator",
			description: "A program that scrapes Reddit posts for their title, content, and x number of top comments and compiles that into a video complete with visuals and text-to-speech narration",
			link: "https://github.com/arnav-exe/reddit-video-narrator"
		},
		
	]

	// gsap animations
	onMount(_ => {
		const tl = gsap.timeline({ defaults: { ease: "power1.inOut" }});

		tl.fromTo(".hero-name", {text: "", opacity: 0}, { text: "ARNAV JAGETIA", opacity: 1, duration: 1.5 });
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
			skewSetter = gsap.quickSetter(".project-card", "skewY", "deg"),
			clamp = gsap.utils.clamp(-10, 10); // restricts skew to +- 10 degrees 

		ScrollTrigger.create({
			onUpdate: self => {
				let skew = clamp(self.getVelocity() / -300);
				if (Math.abs(skew) > Math.abs(proxy.skew)) {
					proxy.skew = skew;gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
				}
			}
		});
	});
</script>

<svelte:head>
	<title>Arnav Jagetia | AI/ML Engineer, Full-Stack Developer, AWS Certified Cloud Architect</title>
	<meta name="description" content="Portfolio of Arnav Jagetia - AI/ML engineer, full-stack developer, AWS certified cloud architect." />
</svelte:head>

<!-- custom cursor -->
<Cursor />

<div class="p-8 space-y-8 w-full overflow-x-hidden">
    <div class="relative z-40 flex justify-end items-center h-full mx-auto">
		<RadioGroup class="justify-end" background="bg-secondary-500 dark:bg-surface-900" active="bg-surface-900 dark:bg-primary-500" color="text-primary-500 dark:text-surface-900">
			<RadioItem bind:group={page} name="justify" value={0}>Portfolio</RadioItem>
			<a href="/blog"><RadioItem bind:group={page} name="justify" value={1}>Blog</RadioItem></a>
		</RadioGroup>
	</div>

	<!-- LANDING PAGE -->
	<div class="w-full h-dvh flex flex-col -translate-y-32 justify-center items-center">
		<h1 class="h1 hero-name leading-none mx-16 text-center font-bold title">ARNAV JAGETIA</h1>
		<div class="flex flex-col translate-y-32 sm:flex-row">
			<div class="text-xl text-center hero-text1 uppercase">AI/ML Engineer</div>
			<div class="text-xl text-center mx-16 hero-text2 uppercase">Full-Stack Developer</div>
			<div class="text-xl text-center hero-text3 uppercase">Cloud Architect</div>
		</div>

		<!-- aws certifications -->
		<div class="absolute bottom-4 right-0 sm:w-56 w-28">
			<div class="flex flex-row">
				<a class="hover:scale-125 transition-all" href="https://www.credly.com/badges/7e08ab0f-ab35-4596-b6d9-d4bb5f45039f/public_url">
					<img src="{developer}" alt="AWS Developer Associate Certification" />
				</a>
				
				<a class="hover:scale-125 transition-all" href="https://www.credly.com/badges/890bf57a-2cac-4be1-9d14-d81201defc6d/public_url">
					<img src="{practitioner}" alt="AWS Cloud Practitioner Certification" />
				</a>
			</div>
		</div>

		<!-- socials -->
		<div class="absolute right-0 w-10">
			<a class="w-10 mx-4 my-8 fill-surface-500 hover:fill-surface-400 dark:fill-primary-500 dark:hover:fill-primary-700" href="https://www.github.com/arnav-exe/"><GitHub /></a>
			<a class="w-10 mx-4 my-8 fill-surface-500 hover:fill-surface-400 dark:fill-primary-500 dark:hover:fill-primary-700" href="https://www.linkedin.com/in/arnav-jagetia/"><Linkedin /></a>
		</div>
	</div>

	<!-- scroll indicator svg -->
	<div class="w-full flex justify-center">
		<div class="w-8 my-3 -translate-y-64">
			<div class="mb-3">
				<Mouse />
			</div>
			<DownChevron />
		</div>
	</div>


	<div class="flex justify-center -translate-y-64">
		<div class="w-[90%]">
			<!-- ABOUT ME -->
			<div class="my-32">
				<h2 class="h2 font-bold mb-4 flex items-center gap-8 whitespace-nowrap before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15 after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15">ABOUT ME</h2>
				<div class="about-section border-primary-500/20 pl-7 flex flex-col gap-5">
					<p class="translate-x-5">Hi! I am an AI/ML engineer, full-stack developer, and cloud architect with a strong passion for building end-to-end AI solutions. I am driven by the challenge of solving complex engineering problems where data, software systems, and cloud infrastructure intersect.</p>
					<p class="translate-x-5">I enjoy working across the entire product lifecycle, from designing machine learning models to developing user-facing applications and deploying production solutions to the cloud.</p>
					<p class="translate-x-5">With a Master's degree in Artificial Intelligence, 2 AWS certifications, and a strong software engineering background, I uniquely bring research depth and practical engineering experience to real-world problems.</p>
					<p class="translate-x-5">I love reading about advances in AI research and tinkering with emerging tools and frameworks by building exploratory side projects. I also have a blog which I regularly update with my thoughts and opinions of various topics in the AI space, as well as my side-projects and other shenanigans that I get up to, which you can check out <a href="/blog" class="underline">here</a>!</p>
				</div>
			</div>



			<!-- SKILLS -->
			<div class="my-32">
				<h2 class="h2 font-bold mb-4 flex items-center gap-8 whitespace-nowrap before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15 after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15">SKILLS</h2>
				<div class="skills-section flex justify-center items-center flex-wrap gap-6">
					<!-- single row of LOGOS of all languages/frameworks HERE: -->
					{#each logos as [name, logo, url]}
						<div class="w-16 sm:w-20 skill-logo-container">
							<a href="{url}" target="_blank" class="block">
								<div use:popup={{ event: 'hover', target: 'popupHover-' + name, placement: 'bottom' }} class="skill-logo-wrapper">
								<!-- skill logo -->
									<svelte:component this={logo} />
								</div>
							</a>
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
			<div class="my-32">
				<h2 class="h2 font-bold mb-4 flex items-center gap-8 whitespace-nowrap before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15 after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15">PROJECTS</h2>

				<!-- project cards -->
                <!-- TODO: change youtube+reddit logo such that it is an outline of the youtube and reddit logo in the primary colour instead of the actual youtube and reddit colours so that it is more inline with the other logos -->
				<div class="projects-section grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 justify-items-center items-start">
					{#each projects as project, i}
						<div class="card-hover w-full max-w-sm">
							<div class="project-card block rounded card-hover p-3 bg-secondary-500 dark:bg-[#1a1917]">
								<a href="{project.link}">
									<div class="w-full max-w-[180px] mx-auto">
										<svelte:component this={imgs[i]} />
									</div>
									<div class="mt-3">
										<p class="text-center font-bold mt-4">{project.title}</p>
										<p class="text-left mb-4">{project.description}</p>
									</div>
								</a>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- EXPERIENCE -->
			<div class="my-32">
				<h2 class="h2 font-bold mb-4 flex items-center gap-8 whitespace-nowrap before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15 after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15">EXPERIENCE</h2>
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
				<div class="experience-section">
					<TL />
				</div>
			</div>

			<!-- CONTACT -->
			<div class="mt-32 mb-32">
				<h2 class="h2 font-bold mb-4 flex items-center gap-8 whitespace-nowrap before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15 after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15">CONTACT ME</h2>

				<div class="contact-section">
					<Contact />
				</div>
			</div>
		</div>
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

	/* skill logo fixes */
	.skill-logo-wrapper {
		display: block;
		width: 100%;
		height: 100%;
	}

	/* make svg logos trigger hover on entire bounding box */
	:global(.skill-logo-wrapper svg) {
		pointer-events: bounding-box;
		width: 100%;
		height: auto;
		display: block;
	}

	/* ensure skill logos have consistent sizing */
	.skill-logo-container {
		flex-shrink: 0;
	}

</style>
