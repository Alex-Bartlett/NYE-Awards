import { supabase } from "$lib/supabaseClient";
import { BadRequest } from '../helper';
import { GAME_ID } from '$env/static/private';

export const POST = async ({ request }) => {
	const body = await request.json();
	const quote_id = body.quote_id;
	const category_id = body.category_id;
	const person_id = body.person_id;
	const round = body.round

	if (quote_id && category_id && person_id && round) {
		const { data, error } = await supabase
			.from('votes')
			.insert({ category_id: category_id, quote_id: quote_id, person_id: person_id, round: round, game_id: GAME_ID })
			.select();
		return new Response(JSON.stringify(data), {
			status: 201
		});
	}
	return BadRequest(`Invalid body: Missing${quote_id ? '' : ' quote_id'}${category_id ? '' : ' category_id'}${person_id ? '' : ' person_id'} value(s)`)
}

export const DELETE = async ({ url, params }) => {
	const all = url.searchParams.get('all');
	if (all == 1) {
		await supabase.from('votes')
			.delete()
			.gt('id', 0)
			.eq('game_id', GAME_ID);
		return new Response(null, { status: 204 });
	}
}