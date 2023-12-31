import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';
import { BadRequest } from '../../helper';
import { GAME_ID } from '$env/static/private';

export const GET = async () => {
    const { data, error } = await supabase
        .rpc('getselfvotes', {
            param_game_id: GAME_ID
        })
    return json(data);
}