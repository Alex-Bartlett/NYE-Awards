<script>
	import PeopleDropdown from "$lib/components/PeopleDropdown.svelte";
	import ListButton from "../../../lib/components/ListButton.svelte";
	export let data;
	let personId;
</script>

<div class="flex justify-center mt-20">
	<ul class="text-center flex flex-col w-1/2 sm:w-1/3 lg:w-1/6 xl:w-1/12">
		{#each data.categories as category}
			<ListButton
				name={category.name}
				href={`/vote/${category.id}`}
				disabled={!data.unsubmittedCategoriesIds.includes(category.id)}
			/>
		{/each}
	</ul>
</div>
