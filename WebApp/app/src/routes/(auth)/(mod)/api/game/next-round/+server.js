import { supabase } from '$lib/supabaseClient';
import { BadRequest } from '../../helper';
import { GAME_ID } from '$env/static/private';

export const PUT = async ({ request, fetch }) => { // Requires the following json body: "confirm":true
    const body = await request.json();
    if (body.confirm && Boolean(body.confirm) === true) {
        const gameQuery = await supabase.from('games').select().eq('id', GAME_ID).single();
        const currentRound = gameQuery.data.current_round;
        const { data, error } = await supabase.from('games').update({ current_round: currentRound + 1 }).eq('id', GAME_ID).single().select();
        console.log(`Incremented round: ${JSON.stringify(data)}`);
        return new Response(JSON.stringify(data), { status: 200 });
    }
    else {
        return BadRequest("Please add 'confirm':true to the request body and try again.")
    }
}