import { json } from '@sveltejs/kit';
import { knex } from "$lib/databaseClient.server.js";
import { GAME_ID } from '$env/static/private';

export const GET = async ({ url, params }) => {
	const unvotedBy = url.searchParams.get('unvotedBy'); // PersonID - Returns only categories that have not got a vote beside them for that person
	const round = url.searchParams.get('round'); // Round number - Required for unvotedBy (probably invalid REST)
	// let query = supabase
	// 	.from('categories')
	// 	.select()
	// 	.eq('game_id', GAME_ID)
	// 	.order('name');
	let query = knex('categories')
		.where('game_id', GAME_ID)
		.orderBy('name');

	if (unvotedBy && round) {
		// const votesRes = await supabase
		// 	.from('votes')
		// 	.select('category_id')
		// 	.eq('person_id', unvotedBy)
		// 	.eq('round', round)

		const votesRes = await knex('votes')
			.where('person_id', unvotedBy)
			.andWhere('round', round)
			.distinct('category_id');
		const votes = votesRes.map((x) => x.category_id);

		query = query.whereNotIn('id', votes);
	}

	try { 
		const res = await query;
		return json(res);
	} catch (error) {
		console.error(error);
		return BadRequest(error);
	}
}

export const POST = async ({ request }) => {
	const body = await request.json();
	if (body.name) {
		// const { data, error } = await supabase
		// 	.from('categories')
		// 	.insert({ name: body.name, game_id: GAME_ID })
		// 	.select();
		const res = await knex('categories')
			.insert({ name: body.name, game_id: GAME_ID })
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