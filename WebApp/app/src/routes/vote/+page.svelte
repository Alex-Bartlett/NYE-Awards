<script>
	import PeopleDropdown from "$lib/components/PeopleDropdown.svelte";
	// your script goes here
	export let data;

	function personSelected(event) {
		const personId = event.detail.personId;
		id = personId;
	}
	let id;
</script>

{#if !id}
	<!-- content here -->
	<PeopleDropdown people={data.people} on:personSelected={personSelected} />
{:else}
	<h1 class="text-3xl">{id}</h1>
{/if}
