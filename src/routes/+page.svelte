<script>
	import { onMount } from 'svelte';

	import { popup, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	// gsap
	import { gsap } from 'gsap';
	import { TextPlugin } from 'gsap/dist/TextPlugin';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	// components
	import Cursor from '../lib/components/Cursor.svelte';
	import Timeline from '../lib/components/Timeline.svelte';
	import Contact from '../lib/components/Contact.svelte';
	import Mouse from '../lib/components/Mouse.svelte';
	import DownChevron from '../lib/components/DownChevron.svelte';

	// aws certs
	import developer from '../lib/images/developer.png';
	import practitioner from '../lib/images/practitioner.png';

	// project logos
	import JewelryFinder from '../lib/icons/projects/JewelryFinder.svelte';
	import InstantContextMCP from '../lib/icons/projects/InstantContextMCP.svelte';
	import ProductNotifier from '../lib/icons/projects/ProductNotifier.svelte';
	import AthenaRevision from '../lib/icons/projects/AthenaRevision.svelte';
	import AiNewsPlatform from '../lib/icons/projects/AiNewsPlatform.svelte';
	import CssbattleMinifier from '../lib/icons/projects/CssbattleMinifier.svelte';
	import Polyboard from '../lib/icons/projects/Polyboard.svelte';

	// skills logos
	import Python from '../lib/icons/skills/Python.svelte';
	import Pytorch from '../lib/icons/skills/Pytorch.svelte';
	import Tensorflow from '../lib/icons/skills/Tensorflow.svelte';
	import Langchain from '../lib/icons/skills/Langchain.svelte';
	import Javascript from '../lib/icons/skills/Javascript.svelte';
	import Typescript from '../lib/icons/skills/Typescript.svelte';
	import Node from '../lib/icons/skills/Node.svelte';
	import Svelte from '../lib/icons/skills/Svelte.svelte';
	import Aws from '../lib/icons/skills/AWS.svelte';
	import Docker from '../lib/icons/skills/Docker.svelte';
	import Git from '../lib/icons/skills/Git.svelte';

	// socials logos
	import GitHub from '../lib/icons/GitHub.svelte';
	import Linkedin from '../lib/icons/Linkedin.svelte';

	// gsap plugin registering
	gsap.registerPlugin(TextPlugin);
	gsap.registerPlugin(ScrollTrigger);

	let page = 0;

	const logos = [
		['Python', Python, 'https://www.python.org/'],
		['PyTorch', Pytorch, 'https://pytorch.org/'],
		['TensorFlow', Tensorflow, 'https://www.tensorflow.org/'],
		['LangChain', Langchain, 'https://www.langchain.com/'],
		['JavaScript', Javascript, 'https://v8.dev/'],
		['TypeScript', Typescript, 'https://www.typescriptlang.org/'],
		['Node.js', Node, 'https://nodejs.org/'],
		['Svelte', Svelte, 'https://svelte.dev/'],
		['AWS', Aws, 'https://aws.amazon.com/'],
		['Docker', Docker, 'https://www.docker.com/'],
		['Git', Git, 'https://git-scm.com/']
	];

	const project_imgs = [
		JewelryFinder,
		InstantContextMCP,
		ProductNotifier,
		AthenaRevision,
		AiNewsPlatform,
		CssbattleMinifier,
		Polyboard
	];

	const projects = [
		{
			title: 'AI Jewelry Finder',
			description: 'An intelligent jewelry search system that converts user sketches and selected design details into targeted product queries, then ranks results using both visual similarity and keyword matching to find closely matching pieces and present shopping links to the user.',
			incomplete: true,
			link: ''
		},
		{
			title: 'Instant Context MCP Server',
			description: 'An MCP server that discovers and indexes llms*.txt documentation sources for libraries and frameworks, so an LLM can query them directly for grounded context during coding workflows',
			link: 'https://github.com/arnav-exe/instant-context-mcp'
		},
		{
			title: 'Product Notifier',
			description: 'An intelligent, pluggable multi-source product monitoring engine that tracks stock and pricing across retailers, normalizes live data, and sends instant ntfy alerts when your purchase conditions are met.',
			link: 'https://github.com/arnav-exe/product-notifier'
		},
		{
			title: 'Athena - AI Revision Assistant',
			description: 'A RAG-powered LLM revision assistant that semantically searches a large student resources repository to deliver accurate, context-aware answers with source page citations, images, and related material suggestions.',
			link: 'https://github.com/arnav-exe/athena-revision-assistant'
		},
		{
			title: 'AI News Platform',
			description:
				'A responsive, modern news platform that leverages LLMs to deliver high-quality article summaries to readers, allowing them to get up-to-date on current affairs in a fraction of the time',
			link: 'https://github.com/arnav-exe/ai-news-platform'
		},
		{
			title: 'CSSBattle Minifier',
			description:
				'A Python script built to intelligently minify your code for the online code golfing game CSSBattle.dev',
			link: 'https://github.com/arnav-exe/cssbattle-minifier'
		},
		{
			title: 'Polyboard - Multiple Clipboards',
			description:
				'A lightweight Python applet that provides the user with upto 10 additional clipboards to store/retrieve text-based data from',
			link: 'https://github.com/arnav-exe/polyboard'
		}
	];

	// gsap animations
	onMount(() => {
		const tl = gsap.timeline({ defaults: { ease: 'power1.inOut' } });

		tl.fromTo(
			'.hero-name',
			{ text: '', opacity: 0 },
			{ text: 'ARNAV JAGETIA', opacity: 1, duration: 1.5 }
		);
		tl.fromTo('.hero-text1', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5 });
		tl.fromTo('.hero-text2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, delay: -1 });
		tl.fromTo('.hero-text3', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, delay: -1 });

		gsap.set('.about-section p', { y: 35, opacity: 0 });
		gsap.set('.skill-logo-container', { scale: 0, opacity: 0 });
		gsap.set('.projects-section', { y: 40, opacity: 0 });
		gsap.set('.timeline-card', { y: 100, opacity: 0 });
		gsap.set('.contact-section', { opacity: 0 });

		gsap.to('.about-section p', {
			opacity: 1,
			y: 0,
			duration: 1.0,
			ease: 'power3.out',
			stagger: 0.15,
			scrollTrigger: { trigger: '.about-section', start: 'top 75%' }
		});
		gsap.to('.skill-logo-container', {
			scale: 1,
			opacity: 1,
			duration: 0.25,
			ease: 'power2.out',
			stagger: { each: 0.05, from: 'center' },
			scrollTrigger: {
				trigger: '.skills-section',
				start: 'top 75%'
			}
		});
		gsap.to('.projects-section', {
			opacity: 1,
			y: 0,
			duration: 1.0,
			ease: 'power3.out',
			scrollTrigger: '.projects-section'
		});
		gsap.to('.timeline-card', {
			opacity: 1,
			y: 0,
			duration: 1.0,
			stagger: 0.2,
			scrollTrigger: {
				trigger: '.edu-and-exp-section',
				start: 'top 75%'
			}
		});
		gsap.to('.contact-section', {
			opacity: 1,
			duration: 1.2,
			ease: 'power3.out',
			scrollTrigger: '.contact-section'
		});

		let proxy = { skew: 0 },
			skewSetter = gsap.quickSetter('.project-card', 'skewY', 'deg'),
			clamp = gsap.utils.clamp(-10, 10); // restricts skew to +- 10 degrees

		ScrollTrigger.create({
			onUpdate: (self) => {
				let skew = clamp(self.getVelocity() / -300);
				if (Math.abs(skew) > Math.abs(proxy.skew)) {
					proxy.skew = skew;
					gsap.to(proxy, {
						skew: 0,
						duration: 0.8,
						ease: 'power3',
						overwrite: true,
						onUpdate: () => skewSetter(proxy.skew)
					});
				}
			}
		});
	});
</script>

<svelte:head>
	<title>Arnav Jagetia | AI/ML Engineer, Full-Stack Developer, AWS Certified Cloud Architect</title>
	<meta
		name="description"
		content="Portfolio of Arnav Jagetia - AI/ML engineer, full-stack developer, AWS certified cloud architect."
	/>
</svelte:head>

<!-- custom cursor -->
<Cursor />

<div class="p-8 space-y-8 w-full overflow-x-hidden">
	<div class="relative z-40 flex justify-end items-center h-full mx-auto">
		<RadioGroup
			class="justify-end"
			background="bg-secondary-500 dark:bg-surface-900"
			active="bg-surface-900 dark:bg-primary-500"
			color="text-primary-500 dark:text-surface-900"
		>
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
				<a
					class="hover:scale-125 transition-all"
					href="https://www.credly.com/badges/7e08ab0f-ab35-4596-b6d9-d4bb5f45039f/public_url"
				>
					<img src={developer} alt="AWS Developer Associate Certification" />
				</a>

				<a
					class="hover:scale-125 transition-all"
					href="https://www.credly.com/badges/890bf57a-2cac-4be1-9d14-d81201defc6d/public_url"
				>
					<img src={practitioner} alt="AWS Cloud Practitioner Certification" />
				</a>
			</div>
		</div>

		<!-- socials -->
		<div class="absolute right-0 w-10">
			<a
				class="w-10 mx-4 my-8 fill-surface-500 hover:fill-surface-400 dark:fill-primary-500 dark:hover:fill-primary-700"
				href="https://www.github.com/arnav-exe/"><GitHub /></a
			>
			<a
				class="w-10 mx-4 my-8 fill-surface-500 hover:fill-surface-400 dark:fill-primary-500 dark:hover:fill-primary-700"
				href="https://www.linkedin.com/in/arnav-jagetia/"><Linkedin /></a
			>
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
				<h2
					class="h2 font-bold mb-4 flex items-center gap-8 whitespace-nowrap before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15 after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15"
				>
					ABOUT ME
				</h2>
				<div class="about-section border-primary-500/20 pl-7 flex flex-col gap-5">
					<p class="translate-x-5">
						Hi! I am an AI/ML engineer, full-stack developer, and cloud architect with a strong
						passion for building end-to-end AI solutions. I am driven by the challenge of solving
						complex engineering problems where data, software systems, and cloud infrastructure
						intersect.
					</p>
					<p class="translate-x-5">
						I enjoy working across the entire product lifecycle, from designing machine learning
						models to developing user-facing applications and deploying production solutions to the
						cloud.
					</p>
					<p class="translate-x-5">
						With a Master's degree in Artificial Intelligence, 2 AWS certifications, and a strong
						software engineering background, I uniquely bring research depth and practical
						engineering experience to real-world problems.
					</p>
					<p class="translate-x-5">
						I love reading about advances in AI research and tinkering with emerging tools and
						frameworks by building exploratory side projects. I also have a blog which I regularly
						update with my thoughts and opinions of various topics in the AI space, as well as my
						side-projects and other shenanigans that I get up to, which you can check out <a
							href="/blog"
							class="underline">here</a
						>!
					</p>
				</div>
			</div>

			<!-- SKILLS -->
			<div class="my-32">
				<h2
					class="h2 font-bold mb-4 flex items-center gap-8 whitespace-nowrap before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15 after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15"
				>
					SKILLS
				</h2>
				<div class="skills-section flex justify-center items-center flex-wrap gap-6">
					<!-- single row of LOGOS of all languages/frameworks HERE: -->
					{#each logos as [name, logo, url]}
						<div class="w-16 sm:w-20 skill-logo-container">
							<a href={url} target="_blank" class="block">
								<div
									use:popup={{ event: 'hover', target: 'popupHover-' + name, placement: 'bottom' }}
									class="skill-logo-wrapper"
								>
									<!-- skill logo -->
									<svelte:component this={logo} />
								</div>
							</a>
						</div>
						<!-- toolip -->
						<div class="card p-3 site-tooltip" data-popup="popupHover-{name}">
							<p class="text-center">{name}</p>
							<div class="arrow site-tooltip-arrow" />
						</div>
					{/each}
				</div>
			</div>

			<!-- PROJECTS -->
			<div class="my-32">
				<h2
					class="h2 font-bold mb-4 flex items-center gap-8 whitespace-nowrap before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15 after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15"
				>
					PROJECTS
				</h2>

				<!-- project cards -->
				<!-- TODO: change youtube+reddit logo such that it is an outline of the youtube and reddit logo in the primary colour instead of the actual youtube and reddit colours so that it is more inline with the other logos -->
				<div
					class="projects-section grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6 justify-items-center items-start"
				>
					{#each projects as project, i}
						<div class="card-hover w-full max-w-sm">
							{#if project.incomplete}
								<div
									class="project-card project-card-under-construction block rounded card-hover p-3 bg-secondary-500 dark:bg-[#1a1917]"
									use:popup={{
										event: 'hover',
										target: 'popupProjectUnderConstruction-' + i,
										placement: 'top'
									}}
									aria-disabled="true"
								>
									<div class="under-construction-badge">Under construction</div>
									<div class="w-full max-w-[180px] mx-auto">
										<svelte:component this={project_imgs[i]} />
									</div>
									<div class="mt-3">
										<p class="text-center font-bold mt-4">{project.title}</p>
										<p class="text-left mb-4">{project.description}</p>
									</div>
								</div>
								<div
									class="card p-3 site-tooltip"
									data-popup={'popupProjectUnderConstruction-' + i}
								>
									<p class="text-center">Under Construction!</p>
									<div class="arrow site-tooltip-arrow" />
								</div>
							{:else}
								<a
									href={project.link}
									class="project-card block rounded card-hover p-3 bg-secondary-500 dark:bg-[#1a1917]"
								>
									<div class="w-full max-w-[180px] mx-auto">
										<svelte:component this={project_imgs[i]} />
									</div>
									<div class="mt-3">
										<p class="text-center font-bold mt-4">{project.title}</p>
										<p class="text-left mb-4">{project.description}</p>
									</div>
								</a>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- EXPERIENCE -->
			<div class="my-32">
				<h2
					class="h2 font-bold mb-4 flex items-center gap-8 whitespace-nowrap before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15 after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15"
				>
					EDUCATION &amp; EXPERIENCE
				</h2>
				<!-- Timeline -->
				<div class="edu-and-exp-section">
					<Timeline />
				</div>
			</div>

			<!-- CONTACT -->
			<div class="mt-32 mb-32">
				<h2
					class="h2 font-bold mb-4 flex items-center gap-8 whitespace-nowrap before:content-[''] before:flex-1 before:h-px before:bg-primary-500/15 after:content-[''] after:flex-1 after:h-px after:bg-primary-500/15"
				>
					CONTACT ME
				</h2>

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

	.project-card-under-construction {
		position: relative;
		cursor: not-allowed;
		border: 1px dashed rgb(var(--color-surface-400) / 0.45);
		box-shadow: inset 0 0 0 1px rgb(var(--color-surface-500) / 0.08);
		opacity: 0.92;
	}

	.project-card-under-construction::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 0.5rem;
		pointer-events: none;
		background: repeating-linear-gradient(
			-45deg,
			rgb(var(--color-surface-500) / 0.02),
			rgb(var(--color-surface-500) / 0.02) 8px,
			transparent 8px,
			transparent 16px
		);
	}

	.under-construction-badge {
		position: absolute;
		top: 0.55rem;
		left: 0.55rem;
		z-index: 2;
		font-size: 0.66rem;
		line-height: 1;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		padding: 0.35rem 0.45rem;
		border-radius: 0.375rem;
		background: rgb(var(--color-surface-500) / 0.08);
		border: 1px solid rgb(var(--color-surface-500) / 0.18);
		color: rgb(var(--color-surface-500));
	}

	:global(.dark) .project-card-under-construction {
		border-color: rgb(var(--color-primary-500) / 0.35);
		box-shadow: inset 0 0 0 1px rgb(var(--color-primary-500) / 0.1);
	}

	:global(.dark) .project-card-under-construction::after {
		background: repeating-linear-gradient(
			-45deg,
			rgb(var(--color-primary-500) / 0.04),
			rgb(var(--color-primary-500) / 0.04) 8px,
			transparent 8px,
			transparent 16px
		);
	}

	:global(.dark) .under-construction-badge {
		background: rgb(var(--color-primary-500) / 0.12);
		border-color: rgb(var(--color-primary-500) / 0.3);
		color: rgb(var(--color-primary-500));
	}

	.site-tooltip {
		background: rgb(33 34 37 / 0.95);
		border: 1px solid rgb(84 86 92 / 0.8);
		box-shadow: 0 10px 24px rgb(0 0 0 / 0.25);
	}

	.site-tooltip :global(p) {
		font-size: 0.9rem;
		line-height: 1.2;
		color: rgb(244 245 246);
	}

	.site-tooltip-arrow {
		background: rgb(33 34 37 / 0.95);
		border: 1px solid rgb(84 86 92 / 0.8);
		border-color: rgb(84 86 92 / 0.8);
	}

	:global(.dark) .site-tooltip {
		background: rgb(20 20 22 / 0.96);
		border-color: rgb(107 110 118 / 0.72);
		box-shadow: 0 12px 28px rgb(0 0 0 / 0.45);
	}

	:global(.dark) .site-tooltip :global(p) {
		color: rgb(237 238 241);
	}

	:global(.dark) .site-tooltip-arrow {
		background: rgb(20 20 22 / 0.96);
		border: 1px solid rgb(107 110 118 / 0.72);
		border-color: rgb(107 110 118 / 0.72);
	}
</style>
