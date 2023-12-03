<script>
	import CategoryChecklist from "$lib/components/CategoryChecklist.svelte";
	import PeopleChecklist from "../../lib/components/PeopleChecklist.svelte";
	export let activeQuote = "To be or not to be";
	export let data;
</script>

<p>{activeQuote}</p>

<CategoryChecklist categories={data.categories} quote={data.quotes[1]} />
<PeopleChecklist people={data.people} quote={data.quotes[1]} />
