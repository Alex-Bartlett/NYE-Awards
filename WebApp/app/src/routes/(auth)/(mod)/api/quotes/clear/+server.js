import { supabase } from "$lib/supabaseClient";
import { GAME_ID } from '$env/static/private';

export const DELETE = async () => {
	let { data, err } = await supabase
		.from('quotes')
		.delete()
		.eq('game_id', GAME_ID)
		.gt('id', 0)
	return new Response(null, { status: 204 });
}