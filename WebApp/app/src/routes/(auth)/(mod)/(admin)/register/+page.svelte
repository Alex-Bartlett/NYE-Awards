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

<div class="flex flex-col items-center mt-5">
  <h1 class="text-2xl">Register</h1>

  <form
    action="?/register"
    method="POST"
    use:enhance
    class="mt-10 flex flex-col items-center"
  >
    <div>
      <label class="block mb-1 text-lg" for="username">Username</label>
      <input
        class="bg-slate-800 text-xl w-52 p-2 rounded-md"
        type="text"
        id="username"
        name="username"
      />
    </div>
    <div class="my-2">
      <label class="block mb-1 text-lg" for="password">Password</label>
      <input
        class="bg-slate-800 text-xl w-52 p-2 rounded-md"
        type="password"
        id="password"
        name="password"
      />
    </div>
    <input type="hidden" id="personId" name="personId" value={personId} />
    <div class="mb-5">
      <div class="text-lg mb-1">Person</div>
      <PeopleDropdown people={data.people} on:personSelected={personSelected} />
    </div>

    {#if form?.user}
      <p class="text-red-500">Username is taken</p>
    {/if}

    <button
      class="mt-2 w-max text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75 disabled:bg-gray-600"
      type="submit">Register</button
    >
  </form>
</div>
