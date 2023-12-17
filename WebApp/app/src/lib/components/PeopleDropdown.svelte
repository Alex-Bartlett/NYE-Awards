<script>
  import { createEventDispatcher } from "svelte";

  export let people;

  let personId;

  const dispatch = createEventDispatcher();

  function SendPerson() {
    dispatch("personSelected", { personId: personId });
  }
</script>

<div class="flex flex-col items-center">
  <select
    bind:value={personId}
    on:change={SendPerson}
    class="bg-slate-800 text-xl w-52 p-2 rounded-md"
  >
    {#each people as person}
      <option value={person.id}
        >{person.name[0].toUpperCase() + person.name.substr(1)}</option
      >
    {/each}
  </select>
</div>
