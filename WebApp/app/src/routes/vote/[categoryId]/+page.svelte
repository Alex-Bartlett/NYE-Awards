<script>
	// Add authentication
	export let data;
	const quotes = Object.entries(data.quotes);
</script>

{quotes}
<div>
	<ul>
		{#each quotes as quote}
			<li>{quote}</li>
		{/each}
	</ul>
</div>
