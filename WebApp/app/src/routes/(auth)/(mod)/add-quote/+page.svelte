<script>
  import { enhance } from "$app/forms";

  import PeopleChecklist from "$lib/components/PeopleChecklist.svelte";
  import CategoryChecklist from "$lib/components/CategoryChecklist.svelte";
  import TextField from "$lib/components/TextField.svelte";

  export let data;
  export let form;

  let people;
  let categories;

  function peopleUpdated(event) {
    people = event.detail.activePeople.filter((p) => p.active == true);
  }

  function categoriesUpdated(event) {
    categories = event.detail.activeCategories.filter((c) => c.active == true);
  }
</script>

<form action="?/submit" method="POST" use:enhance>
  <div class="flex flex-col items-center">
    <div>
      <label class="block text-lg" for="quoteText">Quote</label>
      <TextField
        placeholder="Quote text"
        required="true"
        id="quoteText"
        name="quoteText"
      />
    </div>
    <div>
      <label class="block text-lg" for="year">Year</label>
      <TextField
        placeholder=""
        required="true"
        id="year"
        name="year"
        value={new Date().getFullYear().toString()}
      />
    </div>
    <div>
      <label class="block text-lg" for="round">Round</label>
      <TextField
        placeholder="Round number"
        required="true"
        id="round"
        name="round"
      />
    </div>
    <div class="flex justify-evenly flex-wrap">
      <div class="w-full m-2">
        <h2 class="text-lg mb-2">People</h2>
        <div class="rounded-md bg-slate-800 p-2">
          <PeopleChecklist
            on:peopleSelected={peopleUpdated}
            people={data.people}
          />
        </div>
      </div>
      <div class="w-full m-2">
        <h2 class="text-lg mb-2">Categories</h2>
        <div class="rounded-md bg-slate-800 p-2">
          <CategoryChecklist
            on:categoriesSelected={categoriesUpdated}
            categories={data.categories}
          />
        </div>
      </div>
    </div>
    <input
      type="hidden"
      name="people"
      id="people"
      value={JSON.stringify(people)}
    />
    <input
      type="hidden"
      name="categories"
      id="categories"
      value={JSON.stringify(categories)}
    />

    {#if form?.invalid}
      <p class="text-red-500">Quote, year, and round are required</p>
    {/if}

    <button
      class="w-max text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75"
      type="submit">Submit</button
    >
  </div>
</form>
