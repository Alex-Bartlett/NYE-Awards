export const load = ({ params, fetch, locals }) => {
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

	const fetchQuotes = async () => await fetchQuotesInCategory(params.categoryId);

	async function fetchCategories() {
		const res = await fetch('/api/categories');
		const data = await res.json();
		return data;
	}

	const fetchCategory = async () => {
		const res = await fetch(`/api/categories/${params.categoryId}`);
		const data = await res.json();
		return data;
	}
	const fetchQuotesInCategory = async () => {
		const res = await fetch('/api/quotes?category=' + params.categoryId);
		const data = await res.json();
		return data;
	}

	return {
		user: locals.user,
		category: fetchCategory(),
		quotes: fetchQuotesInCategory()
		// categorisedQuotes: fetchCategorisedQuotes(),
	}
}