import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
    // If no authenticated user, go to login
    if (!locals.user) {
        throw redirect(303, '/login');
    }
    return { user: locals.user };
}