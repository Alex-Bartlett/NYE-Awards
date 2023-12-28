export const BadRequest = function (msg) {
	return new Response(msg, { status: 400 })
}
export const FormatQuoteData = function (elem) {
	let categories = [];
	elem.quote_categories.forEach(category => categories.push({ id: category.categories.id, name: category.categories.name }));
	let people = [];
	elem.quote_people.forEach(person => people.push({ id: person.people.id, name: person.people.name }));
	const res = {
		id: elem.id,
		full_quote: elem.full_quote,
		content: elem.content,
		categories: categories,
		people: people,
		round: elem.round,
	};
	return res;
}