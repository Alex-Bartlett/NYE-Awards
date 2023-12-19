import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
	// return {
	//     user: locals.user
	// }
	if (!locals.user && locals.action !== 'login') {
		throw redirect(303, '/login')
	}
	return { user: locals.user }
}