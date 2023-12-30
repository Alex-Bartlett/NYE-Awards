import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import { GAME_ID } from '$env/static/private';
import { getGameInfo, getTopQuotes } from '$lib/utils/gameUtils';
import rounds_config from '$lib/rounds.config.json'

async function fetchCurrentRound() {
    const { data, error } = await supabase.from('games').select()
}

export const GET = async ({ url, params }) => {
    // Get round from params
    let round = url.searchParams.get('round');
    // If round isn't given, get the current round of the game
    if (!round) {
        const gameInfo = await getGameInfo(GAME_ID);
        round = gameInfo.current_round;
    }

    const topQuotes = await getTopQuotes(GAME_ID, round);
    // To-do: restructure top quotes here by category
    return json(topQuotes);
}
