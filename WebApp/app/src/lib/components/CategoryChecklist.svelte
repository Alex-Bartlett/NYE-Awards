<script>
	export let categories;
	export let quote;

	// Add active value to categories depending on if the quote already has that category assigned
	function GetActiveCategories() {
		let activeCategories = categories;
		quote.categories.forEach((category) => {
			activeCategories.forEach((activeCategory) => {
				if (activeCategory.id == category.id) {
					activeCategory.active = true;
				}
			});
		});
		return activeCategories;
	}

	let activeCategories = GetActiveCategories();

	// Gets the index of the object with the given id, or -1 if not found
	function GetActiveCategoryIndex(id) {
		for (let i in activeCategories) {
			const category = activeCategories[i];
			if (category.id == id) {
				return i;
			}
		}
		return -1;
	}

	// Update active status in activeCategories as the checkboxes are updated
	function Checked(event) {
		const state = event.target.checked;
		const id = event.target.value;
		const activeCategoryIndex = GetActiveCategoryIndex(id);
		// If category is known, set it's active state
		if (activeCategoryIndex >= 0) {
			activeCategories[activeCategoryIndex].active = state;
		}
	}
</script>

{#each activeCategories as category}
	<div>
		<input
			type="checkbox"
			id={`category-${category.id}`}
			value={category.id}
			name={category.name}
			checked={category.active}
			on:change={Checked}
		/>
		<label for={`category-${category.id}`}>{category.name}</label>
	</div>
{/each}
