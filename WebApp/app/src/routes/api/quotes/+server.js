import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest, FormatQuoteData } from '../helper';

export const GET = async ({ params, url }) => {
	const category = url.searchParams.get('category');
	if (category) {
		let data = await GetQuotesByCategory(category);
		return json(data);
	}
	else {
		let data = await GetAllQuotes();
		return json(data);
	}
}

async function GetAllQuotes() {
	const { data, err } = await supabase
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
		quote_categories (
			categories (
				id,
				name
			)
		)
	`);

	if (data) {
		return FormatQuotes(data);
	}
	else {
		return [];
	}
}

async function GetQuotesByCategory(categoryId) {
	if (categoryId > -1) {
		const { data, err } = await supabase
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
				quote_categories!inner (
					category_id,
					categories (
						id,
						name
					)
				)
			`)
			.eq('quote_categories.category_id', categoryId)

		if (data) {
			const formatted = FormatQuotes(data);
			return formatted;
		}
	}
	return [];
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