<script>
	export let href;
	export let name;
	export let disabled = false;
</script>

<li class="my-2">
	{#if !disabled}
		<a
			class="text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 w-full inline-block transition-colors ease-in duration-75"
			{href}
			{disabled}>{name}</a
		>
	{:else}
		<div
			class="text-lg rounded-md bg-gray-600 py-2 px-4 w-full inline-block cursor-default"
		>
			{name}
		</div>
	{/if}
</li>
