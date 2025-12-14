import { knex } from "$lib/databaseClient.server.js";
import { BadRequest } from '../../../../helper';

export const DELETE = async ({ params }) => {
	if (params.id) {
		await knex('quote_people')
			.where('quote_id', params.id)
			.del();
			
		return new Response(null, { status: 204 });
	}
	return BadRequest('Missing id parameter');
}