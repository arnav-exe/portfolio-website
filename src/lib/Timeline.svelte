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
        <p class="text-base font-normal text-surface-700 dark:text-primary-700">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
    </li>

	<li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-surface-500 rounded-full mt-1.5 -start-1.5 dark:bg-primary-500"></div>
        <time class="mb-1 text-sm font-normal leading-none text-tertiary-500 dark:text-secondary-500">June 2022</time>
        <h3 class="text-lg font-bold text-surface-500 dark:text-primary-500">Automation developer @ Tiltlabs</h3>
        <p class="text-base font-normal text-surface-700 dark:text-primary-700">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
    </li>

	<li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-surface-500 rounded-full mt-1.5 -start-1.5 dark:bg-primary-500"></div>
        <time class="mb-1 text-sm font-normal leading-none text-tertiary-500 dark:text-secondary-500">November 2021</time>
        <h3 class="text-lg font-bold text-surface-500 dark:text-primary-500">Front-end developer @ LBR Technology</h3>
        <p class="text-base font-normal text-surface-700 dark:text-primary-700">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
    </li>

	<li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-surface-500 rounded-full mt-1.5 -start-1.5 dark:bg-primary-500"></div>
        <time class="mb-1 text-sm font-normal leading-none text-tertiary-500 dark:text-secondary-500">November 2021</time>
        <h3 class="text-lg font-bold text-surface-500 dark:text-primary-500">Intern @ Rightbot</h3>
        <p class="text-base font-normal text-surface-700 dark:text-primary-700">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
    </li>

	<li class="ms-4">
        <div class="absolute w-3 h-3 bg-surface-500 rounded-full mt-1.5 -start-1.5 dark:bg-primary-500"></div>
        <time class="mb-1 text-sm font-normal leading-none text-tertiary-500 dark:text-secondary-500">August 2020</time>
        <h3 class="text-lg font-bold text-surface-500 dark:text-primary-500">Intern @ Daiko FHO</h3>
        <p class="text-base font-normal text-surface-700 dark:text-primary-700">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
    </li>
</ol>

