<script>
	const experiences = [
		{
			role: 'AI/ML Engineer',
			organization: 'Viavi Solutions',
			organizationUrl: 'https://www.viavisolutions.com/',
			isLatest: true,
			startDate: 'July 2025',
			endDate: 'Present',
			description:
                'Architected and shipped applied ML systems integrating ranking models, knowledge graphs, and multimodal retrieval pipelines under real-world data and reliability constraints. Implemented end-to-end ML infrastructure including feature pipelines, evaluation design, APIs, and cross-platform UIs. Created plug-and-play LLM safety middleware with layered redaction, monitoring, and scalable async processing.'
		},
		{
			role: 'Lead front-end developer',
			organization: 'DSEU',
			organizationUrl: 'https://www.dseu.ac.in/',
			startDate: 'July 2022',
			endDate: 'September 2022',
			description:
				'Designed and developed online marketplace bbmart.in. Used HTML, CSS, JS, jQuery, and Bootstrap to create a fluid modern app responsive on all platforms; led a team of 10+ content writers.'
		},
		{
			role: 'Automation developer',
			organization: 'Tiltlabs',
			organizationUrl: 'https://www.tiltlabs.io/',
			startDate: 'June 2022',
			endDate: 'August 2022',
			description:
				'Developed internal automation tools and macros in Python (OpenCV, Pynput, Pillow) to speed up Illustrator workflows and enable batch rendering; designed NFT and game assets in Photoshop and Illustrator.'
		},
	];

	const education = [
		{
			institution: 'University of St Andrews',
			degree: 'MSc Artificial Intelligence',
			degreeClassification: 'Merit',
			startDate: 'September 2024',
			endDate: 'August 2025',
			description:
				'Specialized in advanced artificial intelligence topics including machine learning, constraint programming, natural language computation, and large-scale data systems. Built practical expertise through AI system design coursework and a research-driven dissertation project. Strengthened theoretical grounding in intelligent reasoning, optimization, and production-oriented ML engineering.',
			projectSummary:
				"Dissertation: 'Athenai AI Revision Assistant'"
		},
		{
			institution: 'Queen Mary University of London',
			degree: 'BEng (Hons) Computer Systems Engineering',
			degreeClassification: 'Distinction',
			startDate: 'September 2021',
			endDate: 'May 2024',
			description:
				'Built foundations across full-stack computing systems from low-level hardware and signal theory to software engineering and distributed data processing. Later specialized in machine learning topics including data mining and neural networks. Graduated with strong practical experience in systems design, embedded development, and performance-driven software.',
			projectSummary:
				"Final Year Project: 'AI Powered News Platform'"
		}
	];

	const monthMap = {
		january: 0,
		february: 1,
		march: 2,
		april: 3,
		may: 4,
		june: 5,
		july: 6,
		august: 7,
		september: 8,
		october: 9,
		november: 10,
		december: 11
	};

	function parseMonthYear(dateString) {
		if (!dateString || typeof dateString !== 'string') return 0;
		const parts = dateString.trim().split(/\s+/);
		if (parts.length !== 2) return 0;
		const month = monthMap[parts[0].toLowerCase()];
		const year = Number(parts[1]);
		if (Number.isNaN(month) || Number.isNaN(year)) return 0;
		return new Date(year, month, 1).getTime();
	}

	const normalizedExperience = experiences.map((entry) => ({
		...entry,
		type: 'experience',
		startKey: entry.startDate.trim(),
		sortStart: parseMonthYear(entry.startDate)
	}));

	const normalizedEducation = education.map((entry) => ({
		...entry,
		type: 'education',
		startKey: entry.startDate.trim(),
		sortStart: parseMonthYear(entry.startDate)
	}));

	const groupedByStartDate = [...normalizedExperience, ...normalizedEducation].reduce(
		(acc, entry) => {
			const group = acc.get(entry.startKey) || {
				startKey: entry.startKey,
				sortStart: entry.sortStart,
				educationEntries: [],
				experienceEntries: []
			};

			if (entry.type === 'education') {
				group.educationEntries.push(entry);
			} else {
				group.experienceEntries.push(entry);
			}

			acc.set(entry.startKey, group);
			return acc;
		},
		new Map()
	);

	const timelineRows = Array.from(groupedByStartDate.values())
		.sort((a, b) => b.sortStart - a.sortStart)
		.flatMap((group) => {
			const rowCount = Math.max(group.educationEntries.length, group.experienceEntries.length);
			const rows = [];

			for (let i = 0; i < rowCount; i += 1) {
				rows.push({
					educationEntry: group.educationEntries[i] || null,
					experienceEntry: group.experienceEntries[i] || null
				});
			}

			return rows;
		})
		.map((row, index) => ({
			...row,
			mobileSide: index % 2 === 0 ? 'left' : 'right'
		}));
</script>

<div class="timeline-wrap mx-auto max-w-6xl">
	<div class="relative">
		<div
			class="pointer-events-none absolute left-1/2 top-0 h-full -translate-x-1/2 border-l-2 border-surface-500/80 dark:border-primary-500/80"
		></div>

		{#each timelineRows as row}
			<div
				class="timeline-row relative mb-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:mb-12 md:gap-6"
			>
				<div class="text-right">
					<div class="hidden md:block">
						{#if row.educationEntry}
							<article class="timeline-card timeline-card-edu ml-auto">
								<p class="timeline-date">
									{row.educationEntry.startDate} - {row.educationEntry.endDate}
								</p>
								<p class="timeline-tag">Education</p>
								<h3 class="timeline-title">{row.educationEntry.institution}</h3>
								<p class="timeline-subtitle">{row.educationEntry.degree}</p>
								<p class="timeline-meta italic">{row.educationEntry.degreeClassification}</p>
								<p class="timeline-copy">{row.educationEntry.description}</p>
								<p class="timeline-project">{row.educationEntry.projectSummary}</p>
							</article>
						{/if}
					</div>

					<div class="md:hidden">
						{#if row.educationEntry && row.experienceEntry}
							<article class="timeline-card timeline-card-edu mr-2">
								<p class="timeline-date">
									{row.educationEntry.startDate} - {row.educationEntry.endDate}
								</p>
								<p class="timeline-tag">Education</p>
								<h3 class="timeline-title">{row.educationEntry.institution}</h3>
								<p class="timeline-subtitle">{row.educationEntry.degree}</p>
							</article>
						{:else if row.mobileSide === 'left'}
							{#if row.educationEntry}
								<article class="timeline-card timeline-card-edu mr-2">
									<p class="timeline-date">
										{row.educationEntry.startDate} - {row.educationEntry.endDate}
									</p>
									<p class="timeline-tag">Education</p>
									<h3 class="timeline-title">{row.educationEntry.institution}</h3>
									<p class="timeline-subtitle">{row.educationEntry.degree}</p>
								</article>
							{:else if row.experienceEntry}
								<article class="timeline-card timeline-card-exp mr-2">
									<p class="timeline-date">
										{row.experienceEntry.startDate} - {row.experienceEntry.endDate}
									</p>
									<p class="timeline-tag">Experience</p>
									<h3 class="timeline-title">
										{row.experienceEntry.role} @ {row.experienceEntry.organization}
									</h3>
								</article>
							{/if}
						{/if}
					</div>
				</div>

				<div class="relative z-10 flex self-center justify-center">
					<div class="timeline-dot"></div>
				</div>

				<div>
					<div class="hidden md:block">
						{#if row.experienceEntry}
							<article class="timeline-card timeline-card-exp">
								<p class="timeline-date">
									{row.experienceEntry.startDate} - {row.experienceEntry.endDate}
								</p>
								<p class="timeline-tag">Experience</p>
								<h3 class="timeline-title">
									{row.experienceEntry.role} @
									{#if row.experienceEntry.organizationUrl}
										<a class="underline" href={row.experienceEntry.organizationUrl}
											>{row.experienceEntry.organization}</a
										>
									{:else}
										{row.experienceEntry.organization}
									{/if}
									{#if row.experienceEntry.isLatest}
										<span class="ml-2 badge bg-secondary-500 dark:bg-tertiary-500">latest</span>
									{/if}
								</h3>
								<p class="timeline-copy">{row.experienceEntry.description}</p>
							</article>
						{/if}
					</div>

					<div class="md:hidden">
						{#if row.educationEntry && row.experienceEntry}
							<article class="timeline-card timeline-card-exp ml-2">
								<p class="timeline-date">
									{row.experienceEntry.startDate} - {row.experienceEntry.endDate}
								</p>
								<p class="timeline-tag">Experience</p>
								<h3 class="timeline-title">
									{row.experienceEntry.role} @ {row.experienceEntry.organization}
								</h3>
							</article>
						{:else if row.mobileSide === 'right'}
							{#if row.experienceEntry}
								<article class="timeline-card timeline-card-exp ml-2">
									<p class="timeline-date">
										{row.experienceEntry.startDate} - {row.experienceEntry.endDate}
									</p>
									<p class="timeline-tag">Experience</p>
									<h3 class="timeline-title">
										{row.experienceEntry.role} @ {row.experienceEntry.organization}
									</h3>
								</article>
							{:else if row.educationEntry}
								<article class="timeline-card timeline-card-edu ml-2">
									<p class="timeline-date">
										{row.educationEntry.startDate} - {row.educationEntry.endDate}
									</p>
									<p class="timeline-tag">Education</p>
									<h3 class="timeline-title">{row.educationEntry.institution}</h3>
									<p class="timeline-subtitle">{row.educationEntry.degree}</p>
								</article>
							{/if}
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.timeline-card {
		max-width: 100%;
		border: 1px solid rgb(var(--color-secondary-600) / 0.65);
		background: rgb(var(--color-secondary-500));
		border-radius: 0.75rem;
		padding: 0.9rem 1rem;
	}

	.timeline-card-edu {
		border-color: rgb(var(--color-tertiary-500) / 0.35);
	}

	.timeline-card-exp {
		border-color: rgb(var(--color-surface-500) / 0.45);
	}

	.timeline-dot {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 9999px;
		background: rgb(var(--color-surface-500));
		box-shadow: 0 0 0 3px rgb(var(--color-secondary-500));
	}

	.timeline-date {
		font-size: 0.84rem;
		line-height: 1.1rem;
		color: rgb(var(--color-surface-400));
		margin-bottom: 0.15rem;
	}

	.timeline-tag {
		font-size: 0.7rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: rgb(var(--color-tertiary-500));
		margin-bottom: 0.25rem;
	}

	.timeline-title {
		font-weight: 700;
		line-height: 1.25;
		color: rgb(var(--color-surface-500));
	}

	.timeline-subtitle,
	.timeline-meta,
	.timeline-copy,
	.timeline-project {
		font-size: 0.95rem;
		line-height: 1.4;
		color: rgb(var(--color-surface-400));
		margin-top: 0.35rem;
	}

	.timeline-project {
		font-style: italic;
	}

	:global(.dark) .timeline-card {
		background: rgb(var(--color-surface-800));
		border-color: rgb(var(--color-secondary-900) / 0.55);
	}

	:global(.dark) .timeline-card-edu {
		border-color: rgb(var(--color-secondary-500) / 0.38);
	}

	:global(.dark) .timeline-card-exp {
		border-color: rgb(var(--color-primary-500) / 0.35);
	}

	:global(.dark) .timeline-dot {
		background: rgb(var(--color-primary-500));
		box-shadow: 0 0 0 3px rgb(var(--color-surface-800));
	}

	:global(.dark) .timeline-date,
	:global(.dark) .timeline-subtitle,
	:global(.dark) .timeline-meta,
	:global(.dark) .timeline-copy,
	:global(.dark) .timeline-project {
		color: rgb(var(--color-secondary-700));
	}

	:global(.dark) .timeline-title {
		color: rgb(var(--color-primary-500));
	}

	:global(.dark) .timeline-tag {
		color: rgb(var(--color-secondary-500));
	}

	@media (max-width: 767px) {
		.timeline-card {
			padding: 0.75rem 0.8rem;
		}

		.timeline-title {
			font-size: 0.95rem;
		}

		.timeline-date,
		.timeline-subtitle,
		.timeline-copy,
		.timeline-project {
			font-size: 0.8rem;
		}
	}
</style>
