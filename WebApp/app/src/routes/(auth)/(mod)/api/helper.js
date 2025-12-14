export const BadRequest = function (msg) {
	return new Response(msg, { status: 400 })
}
// export const FormatQuoteData = function (elem) {
// 	let categories = [];
// 	elem.quote_categories.forEach(category => categories.push({ id: category.id, name: category.name }));
// 	let people = [];
// 	elem.quote_people.forEach(person => people.push({ id: person.people.id, name: person.people.name }));
// 	const res = {
// 		id: elem.id,
// 		full_quote: elem.full_quote,
// 		content: elem.content,
// 		categories: categories,
// 		people: people,
// 		round: elem.round,
// 	};
// 	return res;
// }

export const ShuffleArray = function (array) {
	var m = array.length, t, i;

	// While there remain elements to shuffle…
	while (m) {

		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}