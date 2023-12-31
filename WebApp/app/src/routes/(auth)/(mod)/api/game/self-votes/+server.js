import { supabase } from '$lib/supabaseClient';
import { BadRequest } from '../../helper';
import { GAME_ID } from '$env/static/private';

export const GET = async () => {
    const { data, error } = await supabase
        .from('votes')
        .rpc('GetSelfVotes', {
            param_game_id: GAME_ID
        })
    return data;
}