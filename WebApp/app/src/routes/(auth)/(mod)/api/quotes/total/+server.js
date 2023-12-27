import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest, FormatQuoteData } from '../../helper';
import { GAME_ID } from '$env/static/private';

export const GET = async () => {
	const { data, err } = await supabase
		.from('quotes')
		.select('id')
		.eq('game_id', GAME_ID);

	return new Response(data.length, { status: 200 });
}
