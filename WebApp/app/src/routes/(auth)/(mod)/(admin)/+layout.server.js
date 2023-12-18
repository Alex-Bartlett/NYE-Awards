import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    if (!locals.user) {
        redirect(303, '/login');
    }
    if (locals.user.role !== "ADMIN") {
        redirect(303, '/');
    }
    return {
        user: locals.user
    }
}