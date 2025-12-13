import { json } from '@sveltejs/kit';
import { knex } from "$lib/databaseClient.server.js";
import { BadRequest, FormatQuoteData } from '../../../helper';

export const PUT = async ({ request }) => {
	const body = await request.json();

	if (!body.quote_id) {
		return BadRequest('Missing argument quote_id');
	}
	else if (!body.person_id) {
		return BadRequest('Missing argument person_id');
	}
	// const { error } = await supabase
	// 	.from('quote_people')
	// 	.insert({
	// 		quote_id: body.quote_id,
	// 		person_id: body.person_id
	// 	})
	await knex('quote_people')
		.insert({
			quote_id: body.quote_id,
			person_id: body.person_id
		});
	return new Response(null, { status: 204 });
}

export const DELETE = async ({ request }) => {
	const body = await request.json();

	if (!body.quote_id) {
		return BadRequest('Missing argument quote_id');
	}
	else if (!body.person_id) {
		return BadRequest('Missing argument person_id');
	}
	// const { error } = await supabase
	// 	.from('quote_people')
	// 	.delete()
	// 	.eq('quote_id', body.quote_id)
	// 	.eq('person_id', body.person_id)

	await knex('quote_people')
		.where('quote_id', body.quote_id)
		.andWhere('person_id', body.person_id)
		.del();
		
	return new Response(null, { status: 204 });
}