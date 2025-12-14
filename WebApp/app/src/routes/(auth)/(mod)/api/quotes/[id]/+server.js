import { json } from '@sveltejs/kit';
import { knex } from "$lib/databaseClient.server.js";
import { BadRequest, FormatQuoteData } from '../../helper';

export const GET = async ({ params }) => {
	if (params.id) {
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
		// 	.eq('id', params.id);
		const res = await knex('quotes_with_details')
			.where('id', params.id)
			.select(knex.raw("id, content, full_quote, round, game_id, json_agg(DISTINCT jsonb_build_object('id', category_id, 'name', category_name)) AS categories, json_agg(DISTINCT jsonb_build_object('id', person_id, 'name', person_name)) AS people"))
			.groupBy('id', 'content', 'full_quote', 'round', 'game_id')
			.first();

		if (res) {
			return json(res);
		}
		return new Response(null, { status: 404 });
	}
	return BadRequest('Missing id parameter');
}

export const DELETE = async ({ params }) => {
	if (params.id) {
		// const { error } = await supabase
		// 	.from('quotes')
		// 	.delete()
		// 	.eq('id', params.id);
		await knex('quotes')
			.where('id', params.id)
			.del();
		return new Response(null, { status: 204 });
	}
	return BadRequest('Missing id parameter');
}