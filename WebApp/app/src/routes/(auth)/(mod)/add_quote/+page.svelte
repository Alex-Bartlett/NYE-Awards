<script>
	import PeopleChecklist from "$lib/components/PeopleChecklist.svelte";
	import CategoryChecklist from "$lib/components/CategoryChecklist.svelte";
	import TextField from "$lib/components/TextField.svelte";

	export let data;

	let quoteValue;
	let yearValue = new Date().getFullYear().toString();
	let peopleChecklist;
	let categoryChecklist;

	async function submit() {
		const people = peopleChecklist.activePeople.filter(
			(p) => p.active == true,
		);
		const categories = categoryChecklist.activeCategories.filter(
			(c) => c.active == true,
		);

		const peopleString = Object.values(people)
			.map((p) => p.name)
			.join(", ");

		const fullQuote = `"${quoteValue} - ${peopleString} ${yearValue}"`;

		// Post the quote
		const res = await fetch("/api/quotes", {
			method: "POST",
			body: JSON.stringify({
				content: quoteValue,
				full_quote: fullQuote,
			}),
		});
		const quote = await res.json();

		// Add quote_people
		Object.values(people).forEach(async (person) => {
			await fetch("/api/quotes/assign/person", {
				method: "POST",
				body: JSON.stringify({
					quote_id: quote.id,
					person_id: person.id,
				}),
			});
		});

		// Assign quote's categories
		Object.values(categories).forEach(async (category) => {
			await fetch("/api/quotes/assign/category", {
				method: "POST",
				body: JSON.stringify({
					quote_id: quote.id,
					category_id: category.id,
				}),
			});
		});

		console.log(quote);
	}
</script>

<div class="flex flex-col items-center">
	<form action="POST">
		<div>
			<label class="block text-lg" for="quoteText">Quote</label>
			<TextField
				bind:value={quoteValue}
				placeholder="Quote text"
				required="true"
				id="quoteText"
				name="quoteText"
			/>
		</div>
		<div>
			<label class="block text-lg" for="quoteText">Year</label>
			<TextField
				bind:value={yearValue}
				placeholder=""
				required="true"
				id="year"
				name="year"
			/>
		</div>
		<div class="flex justify-evenly flex-wrap">
			<div class="w-full m-2">
				<h2 class="text-lg mb-2">People</h2>
				<div class="rounded-md bg-slate-800 p-2">
					<PeopleChecklist
						bind:this={peopleChecklist}
						people={data.people}
					/>
				</div>
			</div>
			<div class="w-full m-2">
				<h2 class="text-lg mb-2">Categories</h2>
				<div class="rounded-md bg-slate-800 p-2">
					<CategoryChecklist
						bind:this={categoryChecklist}
						categories={data.categories}
					/>
				</div>
			</div>
		</div>
		<button
			class="w-max text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75"
			on:click={submit}
			type="submit">Submit</button
		>
	</form>
</div>
