<svelte:options accessors={true} />

<script>
	export let people;
	export let quote;
	export let activePeople;

	$: GetActivePeople(people, quote);

	// Add active value to people depending on if the quote already has that person assigned
	function GetActivePeople(people, quote) {
		let newPeople = people;
		quote.people.forEach((person) => {
			newPeople.forEach((activePerson) => {
				if (activePerson.id == person.id) {
					activePerson.active = true;
				}
			});
		});
		activePeople = newPeople;
	}

	// Gets the index of the object with the given id, or -1 if not found
	function GetActivePersonIndex(id) {
		for (let i in activePeople) {
			const person = activePeople[i];
			if (person.id == id) {
				return i;
			}
		}
		return -1;
	}

	// Update active status in activePeople as the checkboxes are updated
	function Checked(event) {
		const state = event.target.checked;
		const id = event.target.value;
		const activePersonIndex = GetActivePersonIndex(id);
		// If person is known, set it's active state
		if (activePersonIndex >= 0) {
			activePeople[activePersonIndex].active = state;
		}
	}
</script>

{#each activePeople as person}
	<div>
		<input
			type="checkbox"
			id={`person-${person.id}`}
			value={person.id}
			name={person.name}
			checked={person.active}
			on:change={Checked}
		/>
		<label for={`person-${person.id}`}
			>{person.name[0].toUpperCase() + person.name.substr(1)}</label
		>
	</div>
{/each}
