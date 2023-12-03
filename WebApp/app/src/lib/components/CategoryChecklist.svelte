<script>
	export let categories;
	export let selectedCategories = ["1"];
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

	// Add/remove category id from selectedCategories as the checkboxes are updated

	// Change this to use activeCategories instead of selectedCategories
	function Checked(event) {
		console.log(event);
		const state = event.target.checked;
		const id = event.target.value;
		if (state) {
			if (!selectedCategories.includes(id)) {
				selectedCategories.push(id);
			}
		} else {
			if (selectedCategories.includes(id)) {
				const res = selectedCategories.filter((elem) => elem != id);
				selectedCategories = res;
			}
		}
		console.log(selectedCategories);
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
		/>
		<label for={`category-${category.id}`}>{category.name}</label>
	</div>
{/each}
