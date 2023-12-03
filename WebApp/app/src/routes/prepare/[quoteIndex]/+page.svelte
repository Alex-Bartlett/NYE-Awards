<script>
	import CategoryChecklist from "$lib/components/CategoryChecklist.svelte";
	import PeopleChecklist from "$lib/components/PeopleChecklist.svelte";
	export let data;
	console.log(data.quote);
</script>

{#if data.quote}
	<p>{data.quote.full_quote}</p>
	<CategoryChecklist categories={data.categories} quote={data.quote} />
	<PeopleChecklist people={data.people} quote={data.quote} />
	<a href={`./${data.nextIndex}`}>Save and continue</a>
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
