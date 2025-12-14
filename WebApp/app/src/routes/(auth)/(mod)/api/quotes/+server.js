import { json } from '@sveltejs/kit';
import { knex } from "$lib/databaseClient.server.js";
import { BadRequest, FormatQuoteData } from '../helper';
import { GAME_ID } from '$env/static/private';

export const GET = async ({ params, url }) => {
	const category = url.searchParams.get('category'); // Category id
	const round = url.searchParams.get('round');
	let data = await GetAllQuotes({ category, round });
	return json(data);
}

async function GetAllQuotes(args) {
	// let query = supabase
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
	// 	quote_categories${args.category ? '!inner' : ''} (
	// 		category_id,
	// 		categories (
	// 			id,
	// 			name
	// 		)
	// 	)
	// 	`)
	// 	.eq('game_id', GAME_ID);

	// let query = knex('quotes')
	// 	.select('quotes.id',
	// 		'quotes.content',
	// 		'quotes.full_quote',
	// 		'people.id',
	// 		'people.name',
	// 		'quote_categories.category_id',
	// 		'categories.id',
	// 		'categories.name')
	// 	.leftJoin('quote_people', 'quote_people.quote_id', '=', 'quotes.id')
	// 	.leftJoin('people', 'people.id', '=', 'quote_people.person_id')

	let query = knex('quotes_with_details')
		.where('game_id', GAME_ID)
		

	if (args.category) {
		query = query.andWhere('category_id', args.category);
	}

	if (args.round) {
		query = query.andWhere('round', args.round);
	}

	query = query.select(knex.raw("id, content,	full_quote, round, game_id,	json_agg(DISTINCT jsonb_build_object('id', category_id, 'name', category_name)) AS categories, json_agg(DISTINCT jsonb_build_object('id', person_id, 'name', person_name)) AS people"))
		.groupBy('id', 'content', 'full_quote', 'round', 'game_id');

	try {
		return await query;
	}
	catch (error) {
		console.error(error);
		return [];
	}
}

// function FormatQuotes(data) {
// 	let formattedData = {}
// 	data.forEach(elem => {
// 		const formatted = FormatQuoteData(elem);
// 		formattedData[formatted.id] = formatted
// 	});
// 	return formattedData;
// }

export const POST = async ({ request }) => {
	const body = await request.json();
	if (body && body.content && body.full_quote && body.round) {
		// const { data, error } = await supabase
		// 	.from('quotes')
		// 	.insert({
		// 		content: body.content,
		// 		full_quote: body.full_quote,
		// 		round: body.round,
		// 		game_id: GAME_ID
		// 	})
		// 	.select()
		// 	.single();
		const res = await knex('quotes')
			.insert({
				content: body.content,
				full_quote: body.full_quote,
				round: body.round,
				game_id: GAME_ID
			})
			.returning('*');
		return new Response(JSON.stringify(res), { status: 201 });
	}
	return BadRequest('Missing content or full_quote argument');
}