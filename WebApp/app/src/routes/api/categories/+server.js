import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";

export const GET = async () => {
	let { data, err } = await supabase
		.from('categories')
		.select()
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
			.from('categories')
			.insert({ name: body.name })
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