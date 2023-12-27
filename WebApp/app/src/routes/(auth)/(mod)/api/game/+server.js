import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import { GAME_ID } from '$env/static/private';

export const GET = async ({ url, params }) => {
    const { data, error } = await supabase
        .from('games')
        .select()
        .eq('id', GAME_ID)
        .single();
    return json(data);
}