<script>
  import { enhance } from "$app/forms";
  import PeopleDropdown from "$lib/components/PeopleDropdown.svelte";
  export let form;
  export let data;
  let personId;
  function personSelected(event) {
    const id = event.detail.personId;
    personId = id;
  }
</script>

<h1>Register</h1>

<form action="?/register" method="POST" use:enhance>
  <div>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" />
  </div>
  <input type="hidden" id="personId" name="personId" value={personId} />
  <div>
    <PeopleDropdown people={data.people} on:personSelected={personSelected} />
  </div>

  {#if form?.user}
    <p class="text-red-500">Username is taken</p>
  {/if}

  <button type="submit">Register</button>
</form>
