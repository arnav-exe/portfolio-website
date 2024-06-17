<script>
	let status = "";
	const handleSubmit = async data => {
		status = 'Submitting...'
		let submitting = true;
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
		
		if (result.success) {
			console.log(result);
			status = result.message || "Success"
		}
	}
</script>



<form on:submit|preventDefault={handleSubmit}>

	<input type="hidden" name="access_key" value="d6e3a62f-1428-4649-bb9f-fe7d35d94e93">

	<div class="flex flex-row justify-center my-6">
		<label class="label w-1/2">
			<span>First Name</span>
			<input class="input" type="text" name="firstName" placeholder="First Name" required />
		</label>
		
		<div class="w-8"></div>

		<label class="label w-1/2">
			<span>Last Name</span>
			<input class="input" type="text" name="lastName" placeholder="Last Name" required />
		</label>
	</div>

	<label class="label my-6">
		<span>Email</span>
		<input class="input" type="text" name="email" placeholder="john.appleseed@email.com" required />
	</label>

	<label class="label my-6">
		<span>Subject</span>
		<input class="input" type="text" name="subject" placeholder="Subject" required />
	</label>

	<label class="label my-6">
		<span>Message</span>
		<textarea class="textarea" rows="4" name="message" placeholder="Message" required />
	</label>

	<div class="flex justify-center">
		<button type="submit" class="button justify-center btn variant-filled-surface dark:variant-filled-primary">SUBMIT</button>
	</div>
</form>

<div>{status}</div>