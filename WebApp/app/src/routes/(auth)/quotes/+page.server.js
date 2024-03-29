export const load = async ({ fetch }) => {
	const fetchCategories = async () => {
		const res = await fetch('/api/categories');
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
		people: fetchPeople()
	}
}