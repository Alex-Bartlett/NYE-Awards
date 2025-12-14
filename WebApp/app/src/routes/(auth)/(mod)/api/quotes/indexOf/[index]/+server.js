import { json } from '@sveltejs/kit';
import { knex } from "$lib/databaseClient.server.js";
import { BadRequest, FormatQuoteData } from '../../../helper';
import { GAME_ID } from '$env/static/private';

export const GET = async ({ params }) => {
	if (params.index) {
		// const { data, error } = await supabase
		// 	.from('quotes')
		// 	.select(`
		// 	id,
		// 	content,
		// 	full_quote,
		// 	quote_people (
		// 		people (
		// 			id,
		// 			name
		// 		)
		// 	),
		// 	quote_categories (
		// 		categories (
		// 			id,
		// 			name
		// 		)
		// 	)
		// 	`)
		// 	.eq('game_id', GAME_ID)
		// 	.order('id', { ascending: true })
		// 	.range(params.index, params.index);
		const res = await knex('quotes_with_details')
			.select(knex.raw("id, content,	full_quote, round, game_id,	json_agg(DISTINCT jsonb_build_object('id', category_id, 'name', category_name)) AS categories, json_agg(DISTINCT jsonb_build_object('id', person_id, 'name', person_name)) AS people"))
			.where('game_id', GAME_ID)
			.groupBy('id', 'content', 'full_quote', 'round', 'game_id')
			.orderBy('id', 'asc');
		if (res && res.length && res[params.index]) {
			return json(res[params.index]);
		}
		return new Response(null, { status: 404 });
	}
	return BadRequest('Missing index parameter');
}