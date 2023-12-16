import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest, FormatQuoteData } from '../../../helper';

export const PUT = async ({ request }) => {
	const body = await request.json();

	if (!body.quote_id) {
		return BadRequest('Missing argument quote_id');
	}
	else if (!body.category_id) {
		return BadRequest('Missing argument category_id');
	}
	const { data, err } = await supabase
		.from('quote_categories')
		.insert({
			quote_id: body.quote_id,
			category_id: body.category_id
		})
	return new Response(null, { status: 204 });
}

export const DELETE = async ({ request }) => {
	const body = await request.json();

	if (!body.quote_id) {
		return BadRequest('Missing argument quote_id');
	}
	else if (!body.category_id) {
		return BadRequest('Missing argument category_id');
	}
	const { err } = await supabase
		.from('quote_categories')
		.delete()
		.eq('quote_id', body.quote_id)
		.eq('category_id', body.category_id)
	return new Response(null, { status: 204 });
}