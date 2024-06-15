<script>
    import { LightSwitch, popup } from "@skeletonlabs/skeleton";

	import Cursor from "../lib/Cursor.svelte";
	import Timeline from "../lib/Timeline/Timeline.svelte";
	import TimelineItem from "../lib/Timeline/TimelineItem.svelte";
	import TL from "../lib/TL.svelte"
	import placeholder from "../lib/images/placeholder.png";

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

	const projectTitles = ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"]
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
				<p class="translate-x-5">Hi, I'm a recent Computer Systems Engineering graduate from QMUL. As a full-stack engineer, I craft sleek, powerful apps with Svelte, JavaScript, Node.js, and Tailwind. I also specialize in machine learning and data analysis using PyTorch, Hadoop, and Spark. Not to mention additional competencies in C, VHDL, and Java</p>
				<p class="translate-x-5">I also excel in architecting resilient and scalable cloud-based solutions using AWS, backed by two AWS certifications: AWS Associate Developer and AWS Cloud Practitioner.</p>
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
				<!-- TODO: ADD GLASS OVERLAY EFFECT TO PROJECT THUMBNAILS -->
				<div class="grid grid-cols-2 gap-8 m-8 justify-items-center items-center">
					{#each projectTitles as project}
						<div class="block card card-hover p-4 max-w-[50%]">
							<button type="button" class="">
									<img src="{placeholder}" class="max-w-[100%]" alt="project {project + 1} card">
									<div class="grid grid-cols-subgrid gap-4">
										<p class="text-center font-bold mt-4">{project}</p>
										<p class="text-left mb-4">This section should be used to provide a brief overview of the project</p>
									</div>
							</button>
						</div>
					{/each}
				</div>
			</div>

			<!-- EXPERIENCE -->
			<div class="my-16">
				<h2 class="h2 font-bold mb-4">EXPERIENCE</h2>
				<!-- vertical timeline -->
				 <Timeline>
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
				 </Timeline>

				 <!-- Timeline v1: -->
				 <!-- <TL /> -->
			</div>

			<!-- CONTACT -->
			<div class="my-16">
				<h2 class="h2 font-bold">CONTACT ME</h2>

				<!-- first name, last name, email, subject, message -->
				<div class="flex flex-row justify-center my-6">
					<label class="label w-1/2">
						<span>First Name</span>
						<input class="input" type="text" placeholder="First Name" />
					</label>
					
					<div class="w-8"></div>

					<label class="label w-1/2">
						<span>Last Name</span>
						<input class="input" type="text" placeholder="Last Name" />
					</label>
				</div>

				<label class="label my-6">
					<span>Email</span>
					<input class="input" type="text" placeholder="john.appleseed@email.com" />
				</label>

				<label class="label my-6">
					<span>Subject</span>
					<input class="input" type="text" placeholder="Subject" />
				</label>

				<label class="label my-6">
					<span>Message</span>
					<textarea class="textarea" rows="4" placeholder="Message" />
				</label>

				<div class="flex justify-center">
					<button type="button" class="button justify-center btn variant-filled-surface dark:variant-filled-primary">SUBMIT</button>
				</div>

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