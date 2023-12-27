<script>
  import { onMount } from "svelte";

  let confirm = false;
  let round = "checking...";

  function Confirm() {
    confirm = true;
  }

  async function NextRound() {}

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
    {:else}
      Are you sure?
    {/if}
  </p>
  <div class="flex justify-center w-1/2 xl:w-1/6 text-center text-lg">
    {#if !confirm}
      <button
        on:click={Confirm}
        class="rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 w-auto inline-block transition-colors ease-in duration-75"
        >Proceed to next round</button
      >
    {:else}
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
