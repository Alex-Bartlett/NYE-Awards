export const load = ({ params, fetch, locals }) => {
	const fetchPeople = async () => {
		const res = await fetch('/api/people');
		const data = await res.json();
		return data;
	}
	// This is so inefficient and desperately needs reworking - the database requests are slowing this down
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

	const fetchUnsubmittedCategoriesIds = async () => {
		if (locals.user) {
			const res = await fetch(`/api/categories?unvotedBy=${locals.user.person_id}`)
			const data = await res.json();
			const ids = data.map((x) => x.id);
			return ids;
		}
		else {
			console.error('Unauthorised user accessed vote page!')
			return [];
		}
	}

	const fetchCategories = async () => {
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
		// categorisedQuotes: fetchCategorisedQuotes(),
		categories: fetchCategories(),
		unsubmittedCategoriesIds: fetchUnsubmittedCategoriesIds(),
	}
}