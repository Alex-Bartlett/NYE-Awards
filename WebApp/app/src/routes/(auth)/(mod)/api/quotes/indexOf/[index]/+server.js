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
		const res = await knex('quotes')
			.leftJoin('quote_people', 'quote_people.quote_id', '=', 'quotes.id')
			.leftJoin('people', 'people.id', '=', 'quote_people.person_id')
			.leftJoin('quote_categoires', 'quote_categories.quote_id', '=', 'quotes.id')
			.leftJoin('categories', 'categories.id', '=', 'quote_categories.category_id')
			.where('quotes.game_id', GAME_ID)
			.orderBy('quotes.id', 'asc')
			.select(
				'quotes.id',
				'quotes.content',
				'quotes.full_quote',
				'people.id',
				'people.name',
				'categories.id',
				'categories.name'
			);
		if (res && res.length && res[params.index]) {
			return json(FormatQuoteData(res[params.index]));
		}
		return new Response(null, { status: 404 });
	}
	return BadRequest('Missing index parameter');
}