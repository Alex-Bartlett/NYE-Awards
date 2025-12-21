import { redirect } from '@sveltejs/kit'

export const load = async ({ params, fetch, locals }) => {
	// Redirect to votes page if user has a vote for this category
	const userAlreadyVoted = await hasUserAlreadyVoted();
	if (userAlreadyVoted) {
		throw redirect(303, '/vote')
	}

	async function FetchRound() {
		const res = await fetch('/api/game');
		const data = await res.json();
		return data.current_round;
	}

	const fetchRound = async () => await FetchRound();

	async function hasUserAlreadyVoted() {
		const res = await fetch(`/api/categories?unvotedBy=${locals.user.person_id}&round=${await FetchRound()}`)
		const data = await res.json();
		const ids = data.map((x) => x.id);
		return !ids.includes(params.categoryId)
	}
	const fetchCategory = async () => {
		const res = await fetch(`/api/categories/${params.categoryId}`);
		const data = await res.json();
		return data;
	}
	const fetchQuotesInCategory = async () => {
		const res = await fetch(`/api/quotes?category=${params.categoryId}&round=${await FetchRound()}`);
		const data = await res.json();
		return data;
	}

	return {
		user: locals.user,
		category: await fetchCategory(),
		quotes: await fetchQuotesInCategory(),
		round: await fetchRound(),
	}
}