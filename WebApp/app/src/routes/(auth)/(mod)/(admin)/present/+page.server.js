export const ssr = false; // Disable SSR because fireworks are so annoying
export const load = async ({ fetch, url, params }) => {
    const categoryId = url.searchParams.get('id') ?? -1;

    const fetchTopQuotes = async () => {
        const res = await fetch('/api/game/top-quotes');
        const data = await res.json();
        return data;
    }

    async function fetchSelfVoters() {
        const res = await fetch('/api/game/self-votes');
        const data = await res.json();

        return data;
    }

    return {
        topQuotes: await fetchTopQuotes(),
        selfVoters: await fetchSelfVoters(),
        categoryId,
    }
}