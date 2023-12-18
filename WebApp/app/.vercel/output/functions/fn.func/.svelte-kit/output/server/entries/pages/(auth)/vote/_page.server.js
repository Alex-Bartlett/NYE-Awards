const load = ({ params, fetch, locals }) => {
  const fetchPeople = async () => {
    const res = await fetch("/api/people");
    const data = await res.json();
    return data;
  };
  const fetchUnsubmittedCategoriesIds = async () => {
    if (locals.user) {
      const res = await fetch(`/api/categories?unvotedBy=${locals.user.person_id}`);
      const data = await res.json();
      const ids = data.map((x) => x.id);
      return ids;
    } else {
      console.error("Unauthorised user accessed vote page!");
      return [];
    }
  };
  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    return data;
  };
  return {
    people: fetchPeople(),
    // categorisedQuotes: fetchCategorisedQuotes(),
    categories: fetchCategories(),
    unsubmittedCategoriesIds: fetchUnsubmittedCategoriesIds()
  };
};
export {
  load
};
