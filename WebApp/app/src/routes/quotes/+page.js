export const load = ({ fetch }) => {
	const fetchQuotes = async () => {
		const res = await fetch('/api/categories');
		const data = await res.json();
		return data;
	}
	return {
		quotes: fetchQuotes()
	}
}