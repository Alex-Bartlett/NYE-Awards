import { json } from '@sveltejs/kit';
import { GAME_ID } from '$env/static/private';
import { getGameInfo } from '$lib/utils/gameUtils'

export const GET = async ({ url, params }) => {
    const gameInfo = await getGameInfo(GAME_ID);
    return json(gameInfo);
}