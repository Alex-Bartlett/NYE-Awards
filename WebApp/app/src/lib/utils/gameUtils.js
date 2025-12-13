import { knex } from '../databaseClient.server';
import rounds_config from '../rounds.config.json'

/**
 * Fetches the game data for the given game ID
 * @param {Number} gameId ID of the game to get
 * @returns {Object} The game object for the given ID
 */
export async function getGameInfo(gameId) {
    // const { data, error } = await supabase
    //     .from('games')
    //     .select()
    //     .eq('id', gameId)
    //     .single();
    try {
        return await knex('games')
            .where('id', gameId)
            .select();
    } catch (error) {
        console.error('Error retrieving game info from database');
        console.error(error);
        // Return an empty object in the case of an error; 'data' will be undefined
        return {};
    }
}

/**
 * Gets the top quotes of the game for the given round
 * @param {*} gameId The ID of the game
 * @param {*} round The round to get results for (correlates with return amount - see rounds.config.json)
 * @returns Top n quotes for each category in the round
 */
export async function getTopQuotes(gameId, round) {
    const count = rounds_config[round].votes_per_category;
    //const { data, error } = await supabase.rpc('gettopquotes', { param_count: count, param_game_id: gameId, param_round: round })
    let res;
    try {
        res = await knex.raw('select * from gettopquotes(?, ?, ?)', [count, gameId, round]);
    } catch (error) {
                console.error('Error retrieving top quotes from database');
        console.error(error)
    }
    return res;
}