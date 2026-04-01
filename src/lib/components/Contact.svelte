<script>
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let firstName = "";
	let lastName = "";
	let email = "";
	let subject = "";
	let message = "";

	let status = "";
	let submitting = false;

	const handleSubmit = async (data) => {
		submitting = true;

		const formData = new FormData(data.currentTarget);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);

		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: json
		});

		const result = await response.json();

		submitting = false;

		if (result.success) {
			status = result.message || 'Success';

			// clear form fields on successful submit
			firstName = "";
			lastName = "";
			email = "";
			subject = "";
			message = "";
		} else if (!result.success) {
			status = 'Failed';
		}
	};
</script>

<!-- contact form -->
<form on:submit|preventDefault={handleSubmit}>
	<!-- web3forms api -->
	<input type="hidden" name="access_key" value="d6e3a62f-1428-4649-bb9f-fe7d35d94e93" />

	<!-- firstname field -->
	<div class="flex flex-row justify-center my-6">
		<label class="label w-1/2">
			<span>First Name</span>
			<input
				class="input contact-field bg-secondary-500 dark:bg-surface-900"
				type="text"
				name="firstName"
				placeholder="First Name"
				bind:value={firstName}
				required
			/>
		</label>

		<!-- firstname lastname separator -->
		<div class="w-8"></div>

		<!-- lastname field -->
		<label class="label w-1/2">
			<span>Last Name</span>
			<input
				class="input contact-field bg-secondary-500 dark:bg-surface-900"
				type="text"
				name="lastName"
				placeholder="Last Name"
				bind:value={lastName}
				required
			/>
		</label>
	</div>

	<!-- email field -->
	<label class="label my-6">
		<span>Email</span>
		<input
			class="input contact-field bg-secondary-500 dark:bg-surface-900"
			type="email"
			name="email"
			placeholder="john.appleseed@email.com"
			bind:value={email}
			required
		/>
	</label>

	<!-- subject field -->
	<label class="label my-6">
		<span>Subject</span>
		<input
			class="input contact-field bg-secondary-500 dark:bg-surface-900"
			type="text"
			name="subject"
			placeholder="Subject"
			bind:value={subject}
			required
		/>
	</label>

	<!-- message field -->
	<label class="label my-6">
		<span>Message</span>
		<textarea
			class="textarea contact-field bg-secondary-500 dark:bg-surface-900"
			rows="4"
			name="message"
			placeholder="Message"
			bind:value={message}
			required
		/>
	</label>

	<!-- status message -->
	<h6 class="h6 flex justify-center mb-6 text-surface-500 dark:text-primary-500">{status}</h6>

	<!-- submit button -->
	<div class="flex justify-center">
		<button
			type="submit"
			class="button justify-center btn variant-filled-surface dark:variant-filled-primary"
		>
			{#if submitting}
				<ProgressRadial
					class="max-w-5"
					meter="stroke-primary-500 dark:stroke-surface-500"
					track="stroke-secondary-500 dark:stroke-tertiary-500"
				/>
			{:else}
				SUBMIT
			{/if}
		</button>
	</div>
</form>

<style>
	.contact-field {
		border: 1px solid rgb(var(--color-surface-500) / 0.25);
		transition:
			border-color 160ms ease,
			box-shadow 160ms ease,
			background-color 160ms ease;
	}

	.contact-field:hover {
		border-color: rgb(var(--color-surface-500) / 0.45);
	}

	.contact-field:focus,
	.contact-field:focus-visible {
		outline: none;
		border-color: rgb(var(--color-primary-500));
		box-shadow: 0 0 0 3px rgb(var(--color-primary-500) / 0.2);
	}

	:global(.dark) .contact-field {
		border-color: rgb(var(--color-primary-500) / 0.28);
	}

	:global(.dark) .contact-field:hover {
		border-color: rgb(var(--color-primary-500) / 0.45);
	}
</style>
