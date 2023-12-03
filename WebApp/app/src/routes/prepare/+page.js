export const load = ({ fetch }) => {
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
	return {
		categories: fetchCategories(),
		quotes: fetchQuotes(),
		people: fetchPeople(),
	}
}