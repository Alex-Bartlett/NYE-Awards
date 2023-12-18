<script>
	import { crossfade, fade, scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { goto } from "$app/navigation";
	import Container from "$lib/components/Container.svelte";

	export let data;
	console.log(data.user);
	const maxSelectedQuotes = 3;

	let quotes = Object.values(data.quotes);
	quotes.forEach((quote) => (quote.isSelected = false));
	$: selectedQuotes = quotes.filter((quote) => quote.isSelected == true);
	$: emoji = selectedQuotes.length === maxSelectedQuotes ? "✔" : "❌";

	const [send, receive] = crossfade({
		fallback: fade,
	});

	async function submit(event) {
		console.log("Clicked");
		selectedQuotes.forEach(async (quote) => {
			const body = JSON.stringify({
				quote_id: quote.id,
				category_id: data.category.id,
				person_id: data.user.person_id,
			});
			await fetch("/api/vote", {
				method: "POST",
				body: body,
			});
		});
		goto("/vote");
	}
</script>

<div class="flex flex-col items-center">
	<h1 class="text-2xl">Voting for: {data.category.name}</h1>
	<Container>
		<p class="text-xl">
			{selectedQuotes.length} out of {maxSelectedQuotes} selected {emoji}
		</p>
		<ul class="text-lg my-2">
			{#each quotes.filter((q) => q.isSelected) as quote (quote.id)}
				<li
					animate:flip
					in:receive={{ key: quote.id }}
					out:send={{ key: quote.id }}
					class="text-left"
				>
					<input
						bind:checked={quote.isSelected}
						type="checkbox"
						id={quote.id}
						value={quote.id}
						name={quote.id}
						disabled={selectedQuotes.length >= maxSelectedQuotes &&
							!selectedQuotes.includes(quote)}
					/>
					<label for={quote.id}>{quote.content}</label>
				</li>
			{/each}
		</ul>
		{#if selectedQuotes.length === maxSelectedQuotes}
			<button
				in:scale={{ duration: 200 }}
				on:click={submit}
				class="mt-2 w-max text-lg rounded-md bg-emerald-700 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75 disabled:bg-gray-600"
				>Submit</button
			>
		{/if}
	</Container>
	<Container>
		<ul class="text-lg">
			{#each quotes.filter((q) => !q.isSelected) as quote (quote.id)}
				<li
					animate:flip
					in:receive={{ key: quote.id }}
					out:send={{ key: quote.id }}
					class="text-left"
				>
					<input
						bind:checked={quote.isSelected}
						type="checkbox"
						id={quote.id}
						value={quote.id}
						name={quote.id}
						disabled={selectedQuotes.length >= maxSelectedQuotes &&
							!selectedQuotes.includes(quote)}
					/>
					<label for={quote.id}>{quote.content}</label>
				</li>
			{/each}
		</ul>
	</Container>

	<div>
		<a href="/vote" class="text-emerald-600 hover:underline"
			>Cancel and return</a
		>
	</div>
</div>
