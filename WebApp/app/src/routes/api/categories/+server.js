import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";

export const GET = async ({ url, params }) => {
	const unvotedBy = url.searchParams.get('unvotedBy'); // PersonID - Returns only categories that have not got a vote beside them for that person
	let query = supabase
		.from('categories')
		.select()
		.order('name');

	if (unvotedBy) {
		const votesRes = await supabase
			.from('votes')
			.select('category_id')
			.eq('person_id', unvotedBy)
		const votesData = votesRes.data.map((x) => x.category_id);
		const votes = `(${votesData.toString()})`

		query = query.not('id', 'in', votes);
	}

	let { data, err } = await query;
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