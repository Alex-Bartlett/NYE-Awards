import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest, FormatQuoteData } from '../helper';

export const GET = async ({ params, url }) => {
	const category = url.searchParams.get('category'); // Category id
	const unvotedBy = url.searchParams.get('unvotedBy'); // Person id
	// console.log(voted);
	let data = await GetAllQuotes({ category, unvotedBy });
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

	if (args.unvotedBy) {
		const votesRes = await supabase
			.from('votes')
			.select('quote_id')
			.eq('person_id', args.unvotedBy)
		const votesData = votesRes.data.map((x) => x.quote_id);
		const votes = `(${votesData.toString()})`
		query = query.not('id', 'in', votes);
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