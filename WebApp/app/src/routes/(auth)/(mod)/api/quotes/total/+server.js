import { json } from '@sveltejs/kit';
import { knex } from "$lib/databaseClient.server.js";
import { BadRequest, FormatQuoteData } from '../../helper';
import { GAME_ID } from '$env/static/private';

export const GET = async () => {
	// const { data, error } = await supabase
	// 	.from('quotes')
	// 	.select('id')
	// 	.eq('game_id', GAME_ID);
	const res = await knex('quotes')
		.where('game_id', GAME_ID)
		.count('id')
		.first();

	return new Response(res.count, { status: 200 });
}
