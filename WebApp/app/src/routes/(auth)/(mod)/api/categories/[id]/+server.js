import { json } from '@sveltejs/kit';
import { knex } from "$lib/databaseClient.server.js";
import { BadRequest } from '../../helper';

export const GET = async ({ params }) => {
	if (params.id) {
		// const { data, error } = await supabase
		// 	.from('categories')
		// 	.select()
		// 	.eq('id', params.id)
		// 	.single();
		const res = await knex('categories')
			.where('id', params.id)
			.first();
		if (res) {
			return json(res);
		}
		return new Response(null, { status: 404 });
	}
	return BadRequest('Missing id parameter')
}

export const DELETE = async ({ params }) => {
	if (params.id) {
		// const { error } = await supabase
		// 	.from('categories')
		// 	.delete()
		// 	.eq('id', params.id);
		await knex('categories')
			.where('id', params.id)
			.del();
		return new Response(null, { status: 204 })
	}
	return BadRequest('Missing id parameter');
}