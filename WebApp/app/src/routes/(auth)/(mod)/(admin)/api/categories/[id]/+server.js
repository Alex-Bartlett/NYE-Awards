import { json } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";
import { BadRequest } from '../../helper';

export const GET = async ({ params }) => {
	if (params.id) {
		const { data, err } = await supabase
			.from('categories')
			.select()
			.eq('id', params.id);
		if (data.length) {
			return json(data);
		}
		return new Response(null, { status: 404 });
	}
	return BadRequest('Missing id parameter')
}

export const DELETE = async ({ params }) => {
	if (params.id) {
		const { err } = await supabase
			.from('categories')
			.delete()
			.eq('id', params.id);
		return new Response(null, { status: 204 })
	}
	return BadRequest('Missing id parameter');
}