import { GAME_ID } from '$env/static/private';

const submit = async ({ request, fetch }) => {
	const data = await request.formData();
	const content = `"${data.get('quoteText')}"`;
	const year = data.get('year');
	let round = Number.parseInt(data.get('round'));
	const people = JSON.parse(data.get('people'));
	const categories = JSON.parse(data.get('categories'));
	// Set default if NaN for round
	if (isNaN(round)) { round = 1 };
	// Get people as a comma separated string
	const peopleString = Object.values(people)
		.map((p) => p.name)
		.join(", ");

	// Construct a full quote in the 'usual' format
	const fullQuote = `${content} - ${peopleString} ${year}`;

	// Post the quote
	const res = await fetch("/api/quotes", {
		method: "POST",
		body: JSON.stringify({
			content: content,
			full_quote: fullQuote,
			round: round,
			game_id: GAME_ID
		}),
	});

	// Retrieve quote from response so we can reference its ID
	const quote = await res.json();


	// Add quote_people
	Object.values(people).forEach(async (person) => {
		await fetch("/api/quotes/assign/person", {
			method: "PUT",
			body: JSON.stringify({
				quote_id: quote.id,
				person_id: person.id,
			}),
		});
	});

	// Assign quote's categories
	Object.values(categories).forEach(async (category) => {
		await fetch("/api/quotes/assign/category", {
			method: "PUT",
			body: JSON.stringify({
				quote_id: quote.id,
				category_id: category.id,
			}),
		});
	});

	console.log(quote);
}

export const load = async ({ fetch }) => {
	const fetchPeople = async () => {
		const res = await fetch('/api/people');
		const data = await res.json();
		return data;
	}
	const fetchCategories = async () => {
		const res = await fetch('/api/categories');
		const data = await res.json();
		return data;
	}
	return {
		people: await fetchPeople(),
		categories: await fetchCategories(),
	}
}

export const actions = { submit }