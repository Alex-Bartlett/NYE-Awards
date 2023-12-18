import { fail, redirect } from "@sveltejs/kit";
import bycrypt from 'bcrypt';
import { supabase } from '$lib/supabaseClient.js';

export const load = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
}

const login = async ({ cookies, request }) => {
	const data = await request.formData();
	const username = data.get('username').toLowerCase();
	const password = data.get('password');

	if (!username || !password) {
		return fail(400, { invalid: true });
	}

	const user = await getUserByUsername(username);

	if (!user) {
		return fail(400, { credentials: true });
	}

	const userPassword = await bycrypt.compare(password, user.password_hash);

	if (!userPassword) {
		return fail(400, { credentials: true });
	}

	//generate new auth token
	const authenticatedUser = await getAuthenticatedUser(username);

	cookies.set('session', authenticatedUser.user_auth_token, {
		// send cookie on every page
		path: '/',
		// serverside only (cant be viewed with document.cookie)
		httpOnly: true,
		// only requests from the same site can send cookies (csrf attack prevention)
		sameSite: 'strict',
		// only send over https in prod
		secure: process.env.NODE_ENV === 'production',
		// set cookie to expire after 3 days
		maxAge: 60 * 60 * 24 * 3
	})

	throw redirect(302, '/')
}

async function getUserByUsername(username) {
	const { data, err } = await supabase.from('users').select().ilike('username', username).single();
	return data
}

async function getAuthenticatedUser(username) {
	const { data, err } = await supabase.from('users').update({ user_auth_token: crypto.randomUUID() }).ilike("username", username).single().select();
	return data;
}

export const actions = { login }