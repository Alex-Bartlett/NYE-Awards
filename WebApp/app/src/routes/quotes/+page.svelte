<script>
	export let data;
</script>

<div>
	{#each data.quotes as quote}
		<h1>{quote.id}</h1>
		<p>{quote.name}</p>
		<i>{JSON.stringify(quote)}</i>
	{/each}
</div>
