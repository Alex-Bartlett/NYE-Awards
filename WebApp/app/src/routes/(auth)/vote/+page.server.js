export const load = async ({ params, fetch, locals }) => {

	const fetchUnsubmittedCategoriesIds = async () => {
		const res = await fetch(`/api/categories?unvotedBy=${locals.user.person_id}`)
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