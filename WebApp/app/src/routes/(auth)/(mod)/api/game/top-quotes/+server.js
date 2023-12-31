import { json } from '@sveltejs/kit';
import { GAME_ID } from '$env/static/private';
import { getGameInfo, getTopQuotes } from '$lib/utils/gameUtils';

/**
 * Takes topQuotes rpc and restructures it to a categories-first object, each category having its quotes as an object
 * @param {Object} unstructuredQuotes 
 * @returns 
 */
function restructureQuotesToCategories(unstructuredQuotes) {
    let categories = {};
    for (const quote of unstructuredQuotes) {
        const category = quote.category_id;
        // Create an empty array for a new category
        if (!(category in categories)) {
            categories[category] = [];
        }
        // Add the quote to the category
        categories[category].push({
            id: quote.id,
            content: quote.content,
            full_quote: quote.full_quote,
            count: quote.count,
            category_name: quote.category_name
        })
    }
    return categories;
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
    const categories = restructureQuotesToCategories(topQuotes);
    return json(categories);
}
