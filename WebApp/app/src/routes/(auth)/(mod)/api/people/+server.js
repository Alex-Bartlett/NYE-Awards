import { json } from '@sveltejs/kit';
import { knex } from "$lib/databaseClient.server.js";
import { GAME_ID } from '$env/static/private';

export const GET = async () => {
	
	try {
		var res = await knex('people')
			.where('game_id', GAME_ID)
			.orderBy('name');
		return new Response(JSON.stringify(res), {
			status: 200
		});
	}
	catch (error) {
		console.error(error);
		return BadRequest(error);
	}
}

export const POST = async ({ request }) => {
	const body = await request.json();
	if (body.name) {
		const res = await knex('people')
			.insert({name: body.name, game_id: GAME_ID})
			.returning('*');
		return new Response(JSON.stringify(res), {
			status: 201
		});
	}
	return BadRequest('Missing name argument');
}

function BadRequest(msg) {
	return new Response(msg, { status: 400 })
}