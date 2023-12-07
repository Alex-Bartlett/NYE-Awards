<script>
  import PeopleDropdown from "$lib/components/PeopleDropdown.svelte";
  // your script goes here
  export let data;

  function personSelected(event) {
    const id = event.detail.personId;
    personId = id;
  }
  let personId;
</script>

{#if !personId}
  <!-- content here -->
  <PeopleDropdown people={data.people} on:personSelected={personSelected} />
{:else}
  <h1 class="text-3xl">{personId}</h1>
{/if}
