<!-- <script>
    import {
		Timeline,
		TimelineItem,
		TimelineSeparator,
		TimelineDot,
		TimelineConnector,
		TimelineContent,
		TimelineOppositeContent
	} from "svelte-vertical-timeline";

	const experiences = [
		{title: "Lead front-end developer @ DSEU", startDate: "July 2022", desc: "brief description of work experience 1"},
		{title: "Automation developer @ Tiltlabs", startDate: "June 2022", desc: "brief description of work experience 2"},
		{title: "Front-end developer @ LBR Technology", startDate: "November 2021", desc: "brief description of work experience 3"},
		{title: "Intern @ Rightbot", startDate: "November 2021", desc: "brief description of work experience 4"},
		{title: "Intern @ Daiko", startDate: "August 2020", desc: "brief description of work experience 5"}
	];
</script>

<Timeline>
	{#each experiences as e}
	<TimelineItem>
		<TimelineOppositeContent slot="opposite-content">
			<p>{e.startDate}</p>
		</TimelineOppositeContent>
		<TimelineSeparator>
			<TimelineDot class={"w-20 h-20 stroke-primary-500 flex justify-center"} />
			<TimelineConnector />
		</TimelineSeparator>
		<TimelineContent>
			<div class="mb-20">
			<h3 class="h3 font-bold">{e.title}</h3>
			<p>{e.desc}</p>
			</div>
		</TimelineContent>
	</TimelineItem>
	{/each}
</Timeline> -->



<ol class="relative border-s">                  
    <li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-surface-500 rounded-full mt-1.5 -start-1.5 dark:bg-primary-500"></div>
        <time class="mb-1 text-sm font-normal leading-none text-tertiary-500 dark:text-secondary-500">July 2022</time>
        <h3 class="text-lg font-bold text-surface-500 dark:text-primary-500">Lead front-end developer @ DSEU</h3>
        <p class="text-base font-normal text-surface-700 dark:text-primary-700">Designed and developed online marketplace <a href="https://bbmart.in/">bbmart.in</a>; Used HTML, CSS, JS, jQuery, Bootstrap to a create a fluid app with a modern design, responsive on all platforms; Led a team of 10+ content writers.</p>
    </li>

	<li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-surface-500 rounded-full mt-1.5 -start-1.5 dark:bg-primary-500"></div>
        <time class="mb-1 text-sm font-normal leading-none text-tertiary-500 dark:text-secondary-500">June 2022</time>
        <h3 class="text-lg font-bold text-surface-500 dark:text-primary-500">Automation developer @ Tiltlabs</h3>
        <p class="text-base font-normal text-surface-700 dark:text-primary-700">Developed internal automation tools and macros in Python (OpenCV, Pynput, Pillow) to speed up Illustrator workflows and enable batch rendering; designed NFT assets for a client <a href="https://limoverse.io/">limoverse.io</a> and game assets for blockchain based farm game in Photoshop and Illustrator.</p>
    </li>

	<li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-surface-500 rounded-full mt-1.5 -start-1.5 dark:bg-primary-500"></div>
        <time class="mb-1 text-sm font-normal leading-none text-tertiary-500 dark:text-secondary-500">November 2021</time>
        <h3 class="text-lg font-bold text-surface-500 dark:text-primary-500">Front-end developer @ LBR Technology</h3>
        <p class="text-base font-normal text-surface-700 dark:text-primary-700">Designed a responsive corporate website for lithium battery recycling company; used HTML, CSS, JS and Bootstrap for the front-end, SQL for the back-end; Adobe Illustrator, Photoshop and DaVinci Resolve for images, graphics, logos and animation.</p>
    </li>

	<li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-surface-500 rounded-full mt-1.5 -start-1.5 dark:bg-primary-500"></div>
        <time class="mb-1 text-sm font-normal leading-none text-tertiary-500 dark:text-secondary-500">November 2021</time>
        <h3 class="text-lg font-bold text-surface-500 dark:text-primary-500">Intern @ Rightbot</h3>
        <p class="text-base font-normal text-surface-700 dark:text-primary-700">Application of AI in the field of warehouse automation; produced field reports on use of robotics technology, competing company profiles and investment profiles.</p>
    </li>

	<li class="ms-4">
        <div class="absolute w-3 h-3 bg-surface-500 rounded-full mt-1.5 -start-1.5 dark:bg-primary-500"></div>
        <time class="mb-1 text-sm font-normal leading-none text-tertiary-500 dark:text-secondary-500">August 2020</time>
        <h3 class="text-lg font-bold text-surface-500 dark:text-primary-500">Intern @ Daiko FHO</h3>
        <p class="text-base font-normal text-surface-700 dark:text-primary-700">Worked for clients Gourmet Passport and Wattpad; designed digital adverts and posters that were used by the client for digital advertising using Adobe Photoshop and Adobe Illustrator.</p>
    </li>
</ol>

