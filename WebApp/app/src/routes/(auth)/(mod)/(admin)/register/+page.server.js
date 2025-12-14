import { fail, redirect } from "@sveltejs/kit";
import { knex } from '$lib/databaseClient.server.js';
import bcrypt from 'bcrypt';
import { GAME_ID } from '$env/static/private';

const roles = {
	ADMIN: "ADMIN",
	MODERATOR: "MODERATOR",
	USER: "USER"
}

export const load = async ({ locals }) => {
	// Don't redirect logged in users, only admins can register people
	const fetchUnregisteredPeople = async () => {
		// const res = await fetch('/api/people');
		// const data = await res.json();
		// return data;
		//const registeredUsersRes = await supabase.from('users').select('person_id')
		const registeredUsers = await knex('users').pluck('person_id');
		// const { data, error } = await supabase
		// 	.from('people')
		// 	.select(`
        //     id,
        //     name
        //     `)
		// 	.not('id', 'in', registeredUsers)
		// 	.eq('game_id', GAME_ID);
		const res = await knex('people')
			.whereNotIn('id', registeredUsers)
			.andWhere('game_id', GAME_ID)
			.select('id', 'name');
		return res;
	}
	return {
		people: await fetchUnregisteredPeople()
	}
}

const register = async ({ request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');
	const personId = data.get('personId')

	if (!username || !password) {
		return fail(400, { invalid: true })
	}

	const usernameValid = await isUsernameUnique(username);

	if (!usernameValid) {
		return fail(400, { user: true })
	}

	// const res = await supabase
	// 	.from('users')
	// 	.insert({
	// 		username: username,
	// 		password_hash: await bcrypt.hash(password, 10),
	// 		user_auth_token: crypto.randomUUID(),
	// 		role: roles.USER,
	// 		person_id: personId,
	// 		game_id: GAME_ID
	// 	})
	// 	.select();
	await knex('users')
		.insert({
			username: username,
			password_hash: await bcrypt.hash(password, 10),
			user_auth_token: crypto.randomUUID(),
			role: roles.USER,
			person_id: personId,
			game_id: GAME_ID
		});

	throw redirect(303, '/');
}

async function isUsernameUnique(username) {
	//const { data, error } = await supabase.from('users').select().ilike('username', username).single();
	const res = await knex('users').whereILike('username', username).first();
	return res == undefined;
}

export const actions = { register }