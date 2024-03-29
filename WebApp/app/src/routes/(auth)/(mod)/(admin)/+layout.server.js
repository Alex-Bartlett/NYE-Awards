import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(303, '/login');
    }
    if (locals.user.role !== "ADMIN") {
        throw redirect(303, '/')
    }
    return {
        user: locals.user
    }
}