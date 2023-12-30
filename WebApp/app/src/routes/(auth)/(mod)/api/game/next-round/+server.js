import { supabase } from '$lib/supabaseClient';
import { BadRequest } from '../../helper';
import { GAME_ID } from '$env/static/private';
import rounds_config from '$lib/rounds.config.json';

async function GetCurrentRound() {
    const gameQuery = await supabase.from('games').select().eq('id', GAME_ID).single();
    return gameQuery.data.current_round;
}

async function IncrementRound(currentRound) {
    const { data, error } = await supabase.from('games').update({ current_round: currentRound + 1 }).eq('id', GAME_ID).single().select();
    console.log(`Incremented round: ${JSON.stringify(data)}`);
    return data;
}

async function GetTopQuotesOfRound(round) {
    const count = rounds_config[round].votes_per_category;
    const { data, error } = await supabase.rpc('gettopquotes', { param_count: count, param_game_id: GAME_ID, param_round: round })
    return data;
}

async function PromoteTopQuotes(quotes, newRound) {
    for (let quote of quotes) {
        // This is inefficient, and could be hugely optimised with a sproc, but for the sake of a hobby project this will suffice.
        // Turns out Vercel has a 5 second request timeout, so this method times out unless run locally
        const quotePeopleQuery = await supabase.from('quote_people').select().eq('quote_id', quote.id);
        const newQuoteQuery = await supabase.from('quotes').insert({ content: quote.content, full_quote: quote.full_quote, game_id: GAME_ID, round: newRound }).select().single();
        const newQuoteId = newQuoteQuery.data.id;
        // Associate the relevant people to the new quote
        quotePeopleQuery.data.forEach(async qp => {
            await supabase.from('quote_people').insert({ quote_id: newQuoteId, person_id: qp.person_id });
        })
        // Associate the quote to its winning category
        await supabase.from('quote_categories').insert({ quote_id: newQuoteId, category_id: quote.category_id })
    }
}

export const PUT = async ({ request, fetch }) => { // Requires the following json body: "confirm":true
    const body = await request.json();
    // Return a bad request if confirm:true is not in the request body
    if (!(body.confirm && Boolean(body.confirm) === true)) {
        return BadRequest("Please add 'confirm':true to the request body and try again.")
    }

    const currentRound = await GetCurrentRound();
    // increment the round in the database
    const newRound = await IncrementRound(currentRound);
    const topQuotes = await GetTopQuotesOfRound(currentRound);
    await PromoteTopQuotes(topQuotes, currentRound + 1);
    return new Response(newRound, { status: 200 });
}