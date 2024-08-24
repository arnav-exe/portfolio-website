<script>
	const experiences = [
		{
			title: "Lead front-end developer @ <a class='underline' href='https://www.dseu.ac.in/'>DSEU</a> <span class='ml-2 badge bg-secondary-500 dark:bg-tertiary-500'>latest</span>",
			startDate: "July 2022",
			endDate: "September 2022",
			description: "Designed and developed online marketplace <a class='underline text-tertiary-500 dark:text-secondary-500' href='https://www.bbmart.in'>bbmart.in</a>. Used HTML, CSS, JS, jQuery, Bootstrap to a create a fluid app with a modern design, responsive on all platforms; Led a team of 10+ content writers."
		},
		{
			title: "Automation developer @ <a class='underline' href='https://www.tiltlabs.io/'>Tiltlabs</a>",
			startDate: "June 2022",
			endDate: "August 2022",
			description: "Developed internal automation tools and macros in Python (OpenCV, Pynput, Pillow) to speed up Illustrator workflows and enable batch rendering; designed NFT assets for a client <a class='underline text-tertiary-500 dark:text-secondary-500' href='https://www.limoverse.io'>limoverse.io</a> and game assets for blockchain based farm game in Photoshop and Illustrator."
		},
		{
			title: "Front-end developer @ LBR Technology",
			startDate: "November 2021",
			endDate: "July 2022",
			description: "Designed a responsive corporate website for lithium battery recycling company; used HTML, CSS, JS and Bootstrap for the front-end, SQL for the back-end; Adobe Illustrator, Photoshop and DaVinci Resolve for images, graphics, logos and animation."
		},
		{
			title: "Intern @ <a class='underline' href='https://www.rightbot.com/'>Rightbot</a>",
			startDate: "November 2021",
			endDate: "May 2022",
			description: "Application of AI in the field of warehouse automation; produced field reports on use of robotics technology, competing company profiles and investment profiles."
		},
		{
			title: "Intern @ <a class='underline' href='https://in.linkedin.com/company/daikofho'>Daiko FHO</a>",
			startDate: "August 2020",
			endDate: "November 2020",
			description: "Worked for clients Gourmet Passport and Wattpad; designed digital adverts and posters that were used by the client for digital advertising using Adobe Photoshop and Adobe Illustrator."
		},
		
  ];
</script>
  
<!-- timeline container -->
<div class="container mx-auto flex justify-center">
	<div class="relative">
		<!-- vertical timeline line -->
		<div class="absolute left-1/2 transform -translate-x-1/2 border-l-2 border-surface-500 h-full dark:border-primary-500"></div>

		<!-- loop through each experience -->
		{#each experiences as e}
		<!-- timeline entries -->
		<div class="mb-24 flex items-center w-full">
			<!-- date -->
			<div class="w-1/2 text-right">
				<p class="block mb-2 leading-none text-surface-400 dark:text-secondary-700">
					{e.startDate} - {e.endDate}
				</p>
			</div>
			
			<!-- dot -->
			<div class="relative w-1/12 flex justify-center">
				<div class="w-3 h-3 rounded-full mt-1.5 bg-surface-500 dark:bg-primary-500"></div>
			</div>
			
			<!-- title & description -->
			<div class="w-1/2">
				<p class="font-bold text-surface-500 dark:text-primary-500">{@html e.title}</p>
				<p class="translate-x-5 m-2 text-surface-400 dark:text-secondary-700">{@html e.description}</p>
			</div>
		</div>
		{/each}
	</div>
</div>