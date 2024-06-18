<script>
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let status = "";
	let submitting = false;

	const handleSubmit = async data => {
		submitting = true;

		const formData = new FormData(data.currentTarget)
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);

		const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: json
		});

		const result = await response.json();

		submitting = false;
		
		if (result.success) {
			status = result.message || "Success"
		}
		else if (!result.success) {
			status = "Failed";
		}
	}
</script>



<!-- contact form -->
<form on:submit|preventDefault={handleSubmit}>

	<!-- web3forms api -->
	<input type="hidden" name="access_key" value="d6e3a62f-1428-4649-bb9f-fe7d35d94e93">

	<!-- firstname field -->
	<div class="flex flex-row justify-center my-6">
		<label class="label w-1/2">
			<span>First Name</span>
			<input class="input bg-secondary-500 dark:bg-surface-900" type="text" name="firstName" placeholder="First Name" required />
		</label>

		<!-- firstname lastname separator -->
		<div class="w-8"></div>

		<!-- lastname field -->
		<label class="label w-1/2">
			<span>Last Name</span>
			<input class="input bg-secondary-500 dark:bg-surface-900" type="text" name="lastName" placeholder="Last Name" required />
		</label>
	</div>

	<!-- email field -->
	<label class="label my-6">
		<span>Email</span>
		<input class="input bg-secondary-500 dark:bg-surface-900" type="email" name="email" placeholder="john.appleseed@email.com" required />
	</label>

	<!-- subject field -->
	<label class="label my-6">
		<span>Subject</span>
		<input class="input bg-secondary-500 dark:bg-surface-900" type="text" name="subject" placeholder="Subject" required />
	</label>

	<!-- message field -->
	<label class="label my-6">
		<span>Message</span>
		<textarea class="textarea bg-secondary-500 dark:bg-surface-900" rows="4" name="message" placeholder="Message" required />
	</label>

	<!-- status message -->
	<h6 class="h6 flex justify-center mb-6 text-surface-500 dark:text-primary-500">{status}</h6>

	<!-- submit button -->
	<div class="flex justify-center">
		<button type="submit" class="button justify-center btn variant-filled-surface dark:variant-filled-primary">
			{#if submitting}
				<ProgressRadial class="max-w-5" meter="stroke-primary-500 dark:stroke-surface-500"  track="stroke-secondary-500 dark:stroke-tertiary-500" />
			{:else}
				SUBMIT
			{/if}
		</button>
	</div>
</form>