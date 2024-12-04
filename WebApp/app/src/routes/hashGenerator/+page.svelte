<script>
	import { enhance } from "$app/forms";
	import TextField from "$lib/components/TextField.svelte";

	let text = ""; // Input value
</script>

<h1>Text Hasher</h1>
<form action="?/hash" method="POST" use:enhance>
	<label for="text">Enter text to hash (will be logged to console):</label>
	<TextField
		placeholder="Text to hash"
		required="true"
		id="text"
		name="text"
	/>
	<button
		class="w-max text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75"
		type="submit">Submit</button
	>
</form>
