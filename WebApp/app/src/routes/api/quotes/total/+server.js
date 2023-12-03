import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest, FormatQuoteData } from '../../helper';

export const GET = async () => {
	const { data, err } = await supabase
		.from('quotes')
		.select('id');

	return new Response(data.length, { status: 200 });
}
