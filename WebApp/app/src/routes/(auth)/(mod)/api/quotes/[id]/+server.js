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
		const res = await knex('quotes')
			.leftJoin('quote_people', 'quote_people.quote_id', '=', 'quotes.id')
			.leftJoin('people', 'people.id', '=', 'quote_people.person_id')
			.leftJoin('quote_categoires', 'quote_categories.quote_id', '=', 'quotes.id')
			.leftJoin('categories', 'categories.id', '=', 'quote_categories.category_id')
			.where('quotes.id', params.id)
			.select(
				'quotes.id',
				'quotes.content',
				'quotes.full_quote',
				'people.id',
				'people.name',
				'categories.id',
				'categories.name'
			);

		if (res.length) {
			return json(FormatQuoteData(res[0]));
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