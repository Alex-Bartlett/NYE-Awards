import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest, FormatQuoteData } from '../helper';

export const GET = async () => {
	const { data, err } = await supabase
		.from('quotes')
		.select(`
		id,
		content,
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
		let formattedData = {}
		data.forEach(elem => {
			const formatted = FormatQuoteData(elem);
			formattedData[formatted.id] = formatted
		});
		return json(formattedData);
	}
	return json(data);
}

export const POST = async ({ request }) => {
	const body = await request.json();
	console.log(body);
	if (body && body.content) {
		const { data, err } = await supabase
			.from('quotes')
			.insert({
				content: body.content
			})
			.select();
		return new Response(JSON.stringify(data), { status: 201 });
	}
	return BadRequest('Missing content argument');
}