<script>
	import CategoryChecklist from "$lib/components/CategoryChecklist.svelte";
	import PeopleChecklist from "$lib/components/PeopleChecklist.svelte";
	import { goto } from "$app/navigation";
	export let data;

	let categoryChecklist;
	let peopleChecklist;

	async function ClearCategories() {
		await fetch(`/api/quotes/clear/categories/${data.quote.id}`, {
			method: "DELETE",
		});
	}
	async function ClearPeople() {
		await fetch(`/api/quotes/clear/people/${data.quote.id}`, {
			method: "DELETE",
		});
	}

	async function Submit() {
		await ClearCategories();
		categoryChecklist.activeCategories.forEach(async (category) => {
			if (category.active == true) {
				await fetch(`/api/quotes/assign/category`, {
					method: "PUT",
					body: JSON.stringify({
						quote_id: data.quote.id,
						category_id: category.id,
					}),
				});
			}
		});
		await ClearPeople();
		peopleChecklist.activePeople.forEach(async (person) => {
			if (person.active == true) {
				await fetch("/api/quotes/assign/person", {
					method: "PUT",
					body: JSON.stringify({
						quote_id: data.quote.id,
						person_id: person.id,
					}),
				});
			}
		});
		const href = `/prepare/${data.nextIndex}`;
		goto(href);
	}
</script>

{#if data.quote}
	<div class="flex flex-col justify-center mt-10">
		<div class="text-center">
			<h2 class="text-2xl">{data.quote.full_quote}</h2>
		</div>
		<div class="flex justify-center mt-10">
			<div
				class="flex flex-col sm:flex-row flex-grow sm:flex-grow-0 justify-center px-10 sm:px-0 sm:w-2/3 xl:w-1/2"
			>
				<div
					class="rounded-lg border-2 border-slate-300 px-4 pb-3 pt-2 h-auto w-full md:w-1/2 lg:w-2/5 xl:w-1/3 ml-0 sm:mr-10 mb-5 sm:mb-0"
				>
					<h3 class="text-lg mb-2">Categories</h3>
					<CategoryChecklist
						bind:this={categoryChecklist}
						categories={data.categories}
						quote={data.quote}
					/>
				</div>
				<div
					class="rounded-lg border-2 border-slate-300 px-4 pb-3 pt-2 h-auto w-full md:w-1/2 lg:w-2/5 xl:w-1/3 ml-0 sm:ml-10"
				>
					<h3 class="text-lg mb-2">People</h3>
					<PeopleChecklist
						bind:this={peopleChecklist}
						people={data.people}
						quote={data.quote}
					/>
				</div>
			</div>
		</div>
		<div class="flex justify-center mt-10">
			<button
				class="w-max text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75"
				on:click={Submit}>Save and continue</button
			>
		</div>
	</div>
{:else}
	<h2>You have reached the end</h2>
	<a href="/">Return home</a>
{/if}

<!-- 
My problem:

User visits /prepare
Redirects user to first id
/prepare has a parameter /[quoteId] that brings up edit page for that quote
/[quoteId] page has a Next button that saves and sends the user to the next quote id
App needs to know:
	The order of quote IDs -> 
		First quote is ID 1, so page is /prepare/1
		Next quote is ID 7, so page is /prepare/7
	How many quotes there are in total so that the last page says finish instead of next



Solution 1:
	We get quotes in order 
	/prepare does nothing server side
	Click start, user gets sent to /prepare/1 (ex)
	/prepare/[quoteId] doesn't actually use quoteId, instead is an iterator
	Sort of like pagination
	/prepare/1 sends the following request to database ->
		select TOP 1 id
		from quotes
		skip [quoteId] - 1 (ie. id is 8, so skip 7 entries, get 8th quote)
		orderby id
	If result is empty, set the button to Finish
	User clicks Next, gets sent to /prepare/[quoteId] + 1
	Process repeats
	Pros:
		Order is dynamic, no not found errors will occur if a quote is removed whilst working
	Cons:
		Lots of queries - is this actually a problem? I don't think it is.

Solution 2:
	Store all the quotes in a cookie
	Store the previous quote id in a cookie
	Navigate forwards through the list
	Pros:
		Only 1 request to database - fast?
	Cons:
		Non-dynamic, susceptible to 404s if a quote is removed whilst working.
		Must be cleared or updated if the user leaves the /prepare route.
		Actually there are a lot more, this solution is not good. Use solution 1.
 -->
