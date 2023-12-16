export const load = ({ params, fetch }) => {
	const fetchPeople = async () => {
		const res = await fetch('/api/people');
		const data = await res.json();
		return data;
	}

	const fetchCategorisedQuotes = async () => {
		let categories = await fetchCategories();
		const categorisedQuotes = [];

		for (let category of categories) {
			let res = await fetchQuotesInCategory(category.id);
			if (res) {
				const quotes = Object.entries(res);
				if (quotes.length) {
					let collatedQuotes = [];
					quotes.forEach(quote => {
						collatedQuotes.push({ id: quote.id, content: quote.content })
					})
					categorisedQuotes.push({ category: category, quotes: collatedQuotes })
				}
			}
		}
		return categorisedQuotes;
	}

	async function fetchCategories() {
		const res = await fetch('/api/categories');
		const data = await res.json();
		return data;
	}

	async function fetchQuotesInCategory(categoryId) {
		const res = await fetch('/api/quotes?category=' + categoryId);
		const data = await res.json();
		return data;
	}

	return {
		people: fetchPeople(),
		categorisedQuotes: fetchCategorisedQuotes(),
	}
}