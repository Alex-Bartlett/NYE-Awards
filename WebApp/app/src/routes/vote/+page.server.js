export const load = ({ fetch }) => {
	const fetchPeople = async () => {
		const res = await fetch('/api/people');
		const data = await res.json();
		return data;
	}
	return {
		people: fetchPeople()
	}
}