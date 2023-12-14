import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest, FormatQuoteData } from '../helper';

export const GET = async ({ params, url }) => {
	const category = url.searchParams.get('category');
	let data = await GetAllQuotes({ category });
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
	`);

	if (args.category) {
		query = query.eq('quote_categories.category_id', args.category);
	}

	const { data, err } = await query;

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
	console.log(body);
	if (body && body.content && body.full_quote) {
		const { data, err } = await supabase
			.from('quotes')
			.insert({
				content: body.content,
				full_quote: body.full_quote
			})
			.select();
		return new Response(JSON.stringify(data), { status: 201 });
	}
	return BadRequest('Missing content argument');
}