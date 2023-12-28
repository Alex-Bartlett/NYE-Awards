<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let confirm = false;
  let round = "checking...";
  let submitting = false;

  function Confirm() {
    confirm = true;
  }

  async function NextRound() {
    submitting = true;
    // Increment the round and duplicate winning quotes for the next round (see api route for full workings)
    await fetch("/api/game/next-round", {
      method: "PUT",
      body: JSON.stringify({
        confirm: true,
      }),
    });

    goto(".");
  }

  onMount(async () => {
    const res = await fetch("/api/game");
    const data = await res.json();
    round = data.current_round;
  });
</script>

<div class="flex flex-col items-center mt-10">
  <h1 class="text-xl mb-10">Current round: {round}</h1>
  <p class="mb-2 text-lg">
    {#if !confirm}
      Once the current round of voting is complete, click below to increment the
      round, unlocking the next round of voting.
    {:else if !submitting}
      Are you sure?
    {:else}
      Updating the database. This may take a moment, please wait...
    {/if}
  </p>
  <div class="flex justify-center w-1/2 xl:w-1/6 text-center text-lg">
    {#if !confirm}
      <button
        on:click={Confirm}
        class="rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 w-auto inline-block transition-colors ease-in duration-75"
        >Proceed to next round</button
      >
    {:else if !submitting}
      <button
        on:click={NextRound}
        class="mr-2 rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 w-full inline-block transition-colors ease-in duration-75"
        >Yes</button
      >
      <a
        class="ml-2 rounded-md bg-red-700 hover:bg-red-500 py-2 px-4 w-full inline-block transition-colors ease-in duration-75"
        href=".">No</a
      >
    {/if}
  </div>
</div>
