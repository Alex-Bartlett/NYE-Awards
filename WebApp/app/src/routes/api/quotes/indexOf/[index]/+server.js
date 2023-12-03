import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest, FormatQuoteData } from '../../../helper';

export const GET = async ({ params }) => {
	if (params.index) {
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
			`)
			.order('id', { ascending: true })
			.range(params.index, params.index);
		if (data.length) {
			return json(FormatQuoteData(data[0]));
		}
		return new Response(null, { status: 404 });
	}
	return BadRequest('Missing index parameter');
}

export const DELETE = async ({ params }) => {
	if (params.id) {
		const { err } = await supabase
			.from('quotes')
			.delete()
			.eq('id', params.id);
		return new Response(null, { status: 204 });
	}
	return BadRequest('Missing id parameter');
}