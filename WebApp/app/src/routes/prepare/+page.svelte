<script>
	import CategoryChecklist from "$lib/components/CategoryChecklist.svelte";
	export let activeQuote = "To be or not to be";
	export let data;
</script>

<p>{activeQuote}</p>

<!-- {#each data.categories as category}
	<div>
		<input type="checkbox" value={category.id} name={category.name} />
		<label for={category.name}>{category.name}</label>
	</div>
{/each} -->

<CategoryChecklist categories={data.categories} quote={data.quotes[1]} />
