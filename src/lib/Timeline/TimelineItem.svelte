<script>
	export let title = "(Title)";
	export let startDate = "(startDate)";
	export let endDate = "(endDate)";
	export let description = "(Description)";
	export let badgeText = "";
</script>

<li class="mb-10 ml-4">
	<!-- Slot: Icon -->
	<span class="absolute flex items-center justify-center w-3 h-3 bg-surface-500 rounded-full -left-1.5 dark:bg-primary-500"></span>
	
	<!-- start & end date -->
	<p class="block my-4 text-tertiary-700 dark:text-secondary-700">{startDate} - {endDate}</p>
	
	<!-- Title -->
	<h3 class="flex items-center mb-1 space-x-2 -translate-y-2">
		<span class="text-surface-500 dark:text-primary-500">{title}</span>
		<!-- Badge -->
		{#if badgeText}
			<span class="badge bg-secondary-500 dark:bg-tertiary-500">{badgeText}</span>
		{/if}
	</h3>
	
	<!-- Description -->
	<p class="mb-4 opacity-75 text-surface-700 dark:text-primary-700">{description}</p>
	
	<!-- Slot: Default -->
	{#if $$slots.default}
		<div>
			<slot />
		</div>
	{/if}
</li>