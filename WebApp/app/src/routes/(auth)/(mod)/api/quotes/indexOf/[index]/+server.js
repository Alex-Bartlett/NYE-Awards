import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest, FormatQuoteData } from '../../../helper';
import { GAME_ID } from '$env/static/private';

export const GET = async ({ params }) => {
	if (params.index) {
		const { data, error } = await supabase
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
			.eq('game_id', GAME_ID)
			.order('id', { ascending: true })
			.range(params.index, params.index);
		if (data.length) {
			return json(FormatQuoteData(data[0]));
		}
		return new Response(null, { status: 404 });
	}
	return BadRequest('Missing index parameter');
}