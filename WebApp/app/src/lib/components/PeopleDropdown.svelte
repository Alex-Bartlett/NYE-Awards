<script>
	import { createEventDispatcher } from "svelte";
	import { onMount } from "svelte";

	export let people;

	let personId;

	const dispatch = createEventDispatcher();

	function SendPerson() {
		dispatch("personSelected", { personId: personId });
	}
</script>

<select bind:value={personId}>
	{#each people as person}
		<option value={person.id}
			>{person.name[0].toUpperCase() + person.name.substr(1)}</option
		>
	{/each}
</select>

<button
	class="w-max text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75 disabled:bg-gray-600"
	on:click={SendPerson}
	disabled={!personId}>Continue</button
>
