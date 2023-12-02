export const load = ({ fetch }) => {
	const fetchQuotes = async () => {
		const res = await fetch('/api/category');
		const data = await res.json();
		console.log(data);
		// const data = res;

		return data.quotes;
	}
	return {
		quotes: fetchQuotes()
	}
}