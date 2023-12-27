<svelte:options accessors={true} />

<script>
  import { createEventDispatcher, onMount } from "svelte";

  export let categories;
  export let quote = null;
  export let activeCategories;

  const dispatch = createEventDispatcher();

  $: GetActiveCategories(categories, quote);

  function SendCategories() {
    dispatch("categoriesSelected", { activeCategories: activeCategories });
  }

  // Add active value to categories depending on if the quote already has that category assigned
  function GetActiveCategories(categories, quote) {
    let newCategories = categories;
    quote?.categories.forEach((category) => {
      newCategories.forEach((activeCategory) => {
        if (activeCategory.id == category.id) {
          activeCategory.active = true;
        }
      });
    });
    activeCategories = newCategories;
  }

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

    // Dispatch update event
    SendCategories();
  }

  //Send categories when component loads
  onMount(() => {
    SendCategories();
  });
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
