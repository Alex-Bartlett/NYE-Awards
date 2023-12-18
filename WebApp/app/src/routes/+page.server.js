import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
    // return {
    //     user: locals.user
    // }
    if (!locals.user) {
        throw redirect(303, '/login')
    }
    return { user: locals.user }
}