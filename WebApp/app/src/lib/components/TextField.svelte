<script>
	export let value = "",
		placeholder = "",
		id,
		required = false,
		name;
</script>

<input
	class="bg-slate-800 text-xl w-52 p-2 rounded-md"
	type="text"
	{id}
	{name}
	{placeholder}
	required={Boolean(required)}
	bind:value
/>
