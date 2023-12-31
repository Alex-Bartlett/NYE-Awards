
export const load = async ({ fetch, url, params }) => {
    const categoryId = url.searchParams.get('id') ?? -1;

    const fetchTopQuotes = async () => {
        const res = await fetch('/api/game/top-quotes');
        const data = await res.json();
        return data;
    }
    // Run this now, because the output is needed for the fetchWinners method
    const topQuotes = await fetchTopQuotes();

    return {
        topQuotes,
        categoryId,
    }
}