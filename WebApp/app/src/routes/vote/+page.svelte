<script>
	import PeopleDropdown from "$lib/components/PeopleDropdown.svelte";
	// your script goes here
	export let data;

	let personId;

	// This needs to be replaced by login and authentication cookies
	function personSelected(event) {
		const id = event.detail.personId;
		personId = id;
	}
</script>

{#if !personId}
	<!-- content here -->
	<PeopleDropdown people={data.people} on:personSelected={personSelected} />
{:else}{/if}
