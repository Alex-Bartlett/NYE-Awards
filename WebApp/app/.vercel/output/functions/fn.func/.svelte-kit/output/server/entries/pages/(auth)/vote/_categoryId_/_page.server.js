const load = ({ params, fetch, locals }) => {
  const fetchCategory = async () => {
    const res = await fetch(`/api/categories/${params.categoryId}`);
    const data = await res.json();
    return data;
  };
  const fetchQuotesInCategory = async () => {
    const res = await fetch("/api/quotes?category=" + params.categoryId);
    const data = await res.json();
    return data;
  };
  return {
    user: locals.user,
    category: fetchCategory(),
    quotes: fetchQuotesInCategory()
    // categorisedQuotes: fetchCategorisedQuotes(),
  };
};
export {
  load
};
