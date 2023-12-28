export const load = async ({ params, fetch, locals }) => {

	const fetchRound = async () => {
		const res = await fetch('/api/game');
		const data = await res.json();
		return data.current_round;
	}

	const fetchUnsubmittedCategoriesIds = async () => {
		const res = await fetch(`/api/categories?unvotedBy=${locals.user.person_id}&round=${await fetchRound()}`)
		const data = await res.json();
		const ids = data.map((x) => x.id);
		return ids;
	}

	const fetchCategories = async () => {
		const res = await fetch('/api/categories');
		const data = await res.json();
		return data;
	}

	return {
		categories: await fetchCategories(),
		unsubmittedCategoriesIds: await fetchUnsubmittedCategoriesIds(),
	}
}