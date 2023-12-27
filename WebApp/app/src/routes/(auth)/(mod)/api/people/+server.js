import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { GAME_ID } from '$env/static/private';

export const GET = async () => {
	let { data, error } = await supabase
		.from('people')
		.select()
		.eq('game_id', GAME_ID)
		.order('name');
	if (error) {
		console.error(error);
	}
	return json(data);
}

export const POST = async ({ request }) => {
	const body = await request.json();
	if (body.name) {
		const { data, error } = await supabase
			.from('people')
			.insert({ name: body.name, game_id: GAME_ID })
			.select();
		return new Response(JSON.stringify(data), {
			status: 201
		});
	}
	return BadRequest('Missing name argument');
}

function BadRequest(msg) {
	return new Response(msg, { status: 400 })
}