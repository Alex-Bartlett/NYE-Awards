import { knex } from '$lib/databaseClient.server.js';
import { json } from '@sveltejs/kit';
import { GAME_ID } from '$env/static/private';

export const GET = async () => {
    // const { data, error } = await supabase
    //     .rpc('getselfvotes', {
    //         param_game_id: GAME_ID
    //     })
    const res = await knex.raw('select * from getselfvotes(?)', [GAME_ID]);
    return json(res.rows);
}