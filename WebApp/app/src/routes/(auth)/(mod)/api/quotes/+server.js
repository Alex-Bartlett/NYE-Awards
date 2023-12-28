import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest, FormatQuoteData } from '../helper';
import { GAME_ID } from '$env/static/private';

export const GET = async ({ params, url }) => {
	const category = url.searchParams.get('category'); // Category id
	const round = url.searchParams.get('round');
	let data = await GetAllQuotes({ category, round });
	return json(data);
}

async function GetAllQuotes(args) {
	let query = supabase
		.from('quotes')
		.select(`
		id,
		content,
		full_quote,
		quote_people (
			people (
				id,
				name
			)
		),
		quote_categories${args.category ? '!inner' : ''} (
			category_id,
			categories (
				id,
				name
			)
		)
		`)
		.eq('game_id', GAME_ID);

	if (args.category) {
		query = query.eq('quote_categories.category_id', args.category);
	}

	if (args.round) {
		query = query.eq('round', args.round);
	}

	const { data, error } = await query;

	if (data) {
		return FormatQuotes(data);
	}
	else {
		return [];
	}
}

function FormatQuotes(data) {
	let formattedData = {}
	data.forEach(elem => {
		const formatted = FormatQuoteData(elem);
		formattedData[formatted.id] = formatted
	});
	return formattedData;
}

export const POST = async ({ request }) => {
	const body = await request.json();
	if (body && body.content && body.full_quote && body.round) {
		const { data, error } = await supabase
			.from('quotes')
			.insert({
				content: body.content,
				full_quote: body.full_quote,
				round: body.round,
				game_id: GAME_ID
			})
			.select();
		return new Response(JSON.stringify(data), { status: 201 });
	}
	return BadRequest('Missing content or full_quote argument');
}