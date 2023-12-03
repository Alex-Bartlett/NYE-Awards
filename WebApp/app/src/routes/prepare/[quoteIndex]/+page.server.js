export const load = ({ params, fetch }) => {
	const fetchCategories = async () => {
		const res = await fetch('/api/categories');
		const data = await res.json();
		return data;
	}
	const fetchQuotes = async () => {
		const res = await fetch('/api/quotes');
		const data = await res.json();
		return data;
	}
	const fetchPeople = async () => {
		const res = await fetch('/api/people');
		const data = await res.json();
		return data;
	}
	// Possibly not needed?
	const fetchNumQuotes = async () => {
		const res = await fetch('../api/quotes/total');
		const data = await res.json()
		return data;
	};
	const fetchQuoteByIndex = async () => {
		const res = await fetch(`../api/quotes/indexOf/${params.quoteIndex}`);
		if (res.status != 404) {
			const data = await res.json();
			return data;
		}
		else {
			return null;
		}
	}
	const getNextIndex = () => {
		return parseInt(params.quoteIndex) + 1;
	}
	return {
		categories: fetchCategories(),
		quotes: fetchQuotes(),
		people: fetchPeople(),
		numQuotes: fetchNumQuotes(),
		quote: fetchQuoteByIndex(),
		nextIndex: getNextIndex(),
	}
}