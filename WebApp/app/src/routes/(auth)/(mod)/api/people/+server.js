import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { GAME_ID } from '$env/static/private';

export const GET = async () => {
	let { data, err } = await supabase
		.from('people')
		.select()
		.eq('game_id', GAME_ID)
		.order('name');
	if (err) {
		console.error(err);
	}
	return json(data);
}

export const POST = async ({ request }) => {
	const body = await request.json();
	if (body.name) {
		const { data, err } = await supabase
			.from('people')
			.insert({ name: body.name, game_id: GAME_ID })
			.select();
		return new Response(JSON.stringify(data), {
			status: 201
		});
	}
	return BadRequest('Missing name argument');
}

function BadRequest(err) {
	return new Response(err, { status: 400 })
}