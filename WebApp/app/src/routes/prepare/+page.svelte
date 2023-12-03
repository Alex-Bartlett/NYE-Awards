<script>
	import CategoryChecklist from "$lib/components/CategoryChecklist.svelte";
	import PeopleChecklist from "../../lib/components/PeopleChecklist.svelte";
	// export let activeQuote = "To be or not to be";
	// export let data;
	let confirmPrepare = false;
	function ConfirmPrepare() {
		confirmPrepare = true;
	}
</script>

{#if confirmPrepare}
	<a href="/prepare/0">Start</a>
{:else}
	<div class="flex flex-col text-center mt-10">
		<div class="text-xl">
			<span class="text-red-500">Warning: </span>Starting this process
			will clear existing information!
		</div>
		<div class="mt-5">
			<button
				class="text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 w-auto transition-colors ease-in duration-75"
				id="confirmPrepare"
				type="submit"
				name="confirmPrepare"
				on:click={ConfirmPrepare}>I understand</button
			>
		</div>
	</div>
	<!-- Maybe just have the confirm button at the end -->
{/if}
