<script>
	import { onMount } from "svelte";
	import { flip } from "svelte/animate";
	import { fly, fade, slide } from "svelte/transition";
	import { typewriter } from "$lib/animations/typewriter";

	export let data;

	const topQuotes = data.topQuotes;
	const categories = Object.keys(topQuotes);

	// The index of the current category within categories
	let currentCategoryIndex = 0;
	// The winner(s) of the current category
	let winners = [];
	// Is the presentation in-progress
	let inProgress = false;
	// Display the quote
	let showQuote = false;
	// Display runners up
	let showRunnersUp = false;
	// Display next slide button
	let showNextSlideButton = false;
	// Presentation is over
	let presentationComplete = false;

	// If the user supplies a category id in the query, the presentation should start from that category
	const paramCategoryId = data.categoryId;
	// CategoryId is -1 if not supplied
	if (paramCategoryId !== -1 && categories.includes(paramCategoryId)) {
		currentCategoryIndex = categories.indexOf(paramCategoryId);
		inProgress = true;
	}

	// Current quotes
	$: currentQuotes = topQuotes[categories[currentCategoryIndex]];
	// Runners up, everything after the top quote
	$: preRunnersUp = currentQuotes.slice(1);
	// Runners up has to be assigned something in runtime for the animation to play
	// https://svelte.dev/repl/c7f88cd52e744df186570b39de4d352b?version=3.48.0
	let runnersUp = [];

	// Get the winners of the current category
	async function fetchWinners() {
		const winningQuote = currentQuotes[0];
		const res = await fetch(`/api/quotes/${winningQuote.id}`);
		const data = await res.json();
		const people = data.people;
		// People is returned as an array of person objects
		let winners = [];
		people.forEach((person) => {
			// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
			const name = person.name.charAt(0).toUpperCase() + person.name.slice(1);
			winners.push(name);
		});
		return winners.join(", ");
	}

	function beginPresentation(e) {
		inProgress = true;
	}

	async function nextSlide(e) {
		// Reset variables
		inProgress = true;
		showQuote = false;
		showRunnersUp = false;
		showNextSlideButton = false;
		runnersUp = [];

		// If there's no more categories left, end the presentation
		if (currentCategoryIndex === categories.length) {
			presentationComplete = true;
		} else {
			currentCategoryIndex++;
		}
	}

	function revealQuote() {
		showQuote = true;
	}
	function revealRunnersUp() {
		showRunnersUp = true;
	}
	// This is clever, but also really dumb - the number of runners up could vary, and we need to display the button once the last one plays. But because they are programmatically generated in the html, the triggers will all do the same. This is my approach to get around that
	// By making this a reactive element, this should reset every time preRunnersUp changes, which saves the need for reassignment further down
	$: numRunnersUp = preRunnersUp.length;
	// Start at eg 3, every time an animatione ends, decrement it, and when it's 0, then we display the button
	function revealNextSlideButton() {
		// Decrement the counter until it reaches 0
		numRunnersUp--;
		// Reveal once it is 0
		if (numRunnersUp === 0) {
			showNextSlideButton = true;
		}
	}

	function refreshRunnersUp() {
		runnersUp = preRunnersUp;
		numRunnersUp = preRunnersUp.length; // Repeat the above here for when this value resets
	}

	// Fetch winners on load
	onMount(async () => {
		winners = await fetchWinners();
	});
</script>

<main>
	{#if !inProgress}
		<div class="flex flex-col items-center">
			<button
				on:click={beginPresentation}
				class="w-max text-lg rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75"
				>Begin Presentation</button
			>
		</div>
	{:else}
		<div out:fade={{ duration: 200 }} class="flex flex-col items-center">
			<h1
				in:fly={{ y: 200, duration: 800 }}
				id="title"
				class="text-3xl transition-all duration-500"
				class:mt-20={!showQuote}
				class:text-6xl={!showQuote}
			>
				{currentQuotes[0].category_name}
			</h1>
			{#if showQuote}
				<h2 in:fade={{ delay: 800, duration: 500 }} class="text-4xl mt-10">
					<span class="flash">{winners}</span> won with
				</h2>
				<h2
					in:typewriter={{ speed: 2, delay: 1600 }}
					on:introend={revealRunnersUp}
					id="content"
					class="mt-10 text-5xl"
				>
					{currentQuotes[0].content}
				</h2>

				{#if showRunnersUp}
					<div
						in:fly={{ y: 50, duration: 400, delay: 2000 }}
						on:introend={refreshRunnersUp}
						class="mt-20 flex flex-col items-center"
					>
						<h3 class="text-3xl">Runners up</h3>
						<ul>
							<li class="mt-5"></li>
							{#each runnersUp as runnerUp, i ({})}
								<li
									in:typewriter={{
										duration: (i + 1) * 500,
										delay: (i + 1) * 1000,
									}}
									on:introend={revealNextSlideButton}
									class="text-2xl mt-2"
								>
									{runnerUp.content}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			{:else}
				<button
					in:fade|global={{ duration: 300, delay: 1000 }}
					out:fade={{ duration: 100 }}
					on:click={revealQuote}
					class="mt-40 w-max text-xl rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75"
					>Reveal</button
				>
			{/if}
			{#if showNextSlideButton}
				<button
					in:fade|global={{ duration: 300, delay: 2000 }}
					on:click={nextSlide}
					class="mt-10 w-max text-xl rounded-md bg-emerald-800 hover:bg-emerald-600 py-2 px-4 transition-colors ease-in duration-75"
				>
					{#if !presentationComplete}
						Next Category
					{:else}
						Secret Category
					{/if}</button
				>
			{/if}
		</div>
	{/if}
</main>

<style>
	.flash {
		animation: flasher 1s linear infinite;
	}

	@keyframes flasher {
		0% {
			color: blue;
		}
		25% {
			color: red;
		}
		50% {
			color: yellow;
		}
		75% {
			color: limegreen;
		}
		100% {
			color: blue;
		}
	}
</style>
