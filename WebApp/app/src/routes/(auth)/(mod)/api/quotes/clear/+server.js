import { knex } from "$lib/databaseClient.server.js";
import { GAME_ID } from '$env/static/private';

export const DELETE = async () => {
	// let { data, error } = await supabase
	// 	.from('quotes')
	// 	.delete()
	// 	.eq('game_id', GAME_ID)
	// 	.gt('id', 0)
	await knex('quotes')
		.where('game_id', GAME_ID)
		.andWhere('id', '>', 0)
		.del();
		
	return new Response(null, { status: 204 });
}