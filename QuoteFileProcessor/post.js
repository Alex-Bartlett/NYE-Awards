// Import quotes
// Update these as necessary
const url = 'http://127.0.0.1:5173'
const dump = require('./output/quotes_1701644489317.json')

// Get all people from dump
function GetDumpPeople() {
	let dumpPeople = [];
	dump.forEach(quote => {
		quote.people.forEach(person => {
			if (!dumpPeople.includes(person)) {
				dumpPeople.push(person.toLowerCase())
			}
		})
	})
	return dumpPeople
}

// Get all people from database
async function GetDbPeople() {
	let dbPeople = [];
	let res = await fetch(`${url}/api/people`);
	let data = await res.json()
	data.forEach(person => {
		dbPeople.push(person.name.toLowerCase());
	})
	return dbPeople;
}

// Post people to database
async function PostPeopleToDatabase() {
	const dumpPeople = GetDumpPeople();
	const dbPeople = await GetDbPeople();
	dumpPeople.forEach(async person => {
		if (!dbPeople.includes(person)) {
			let res = await fetch(`${url}/api/people`, {
				method: "POST",
				body: JSON.stringify({
					name: person
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			let data = await res.json();
			console.log(data);
		}
	});
}

PostPeopleToDatabase();

async function GetPeopleWithIds() {
	let res = await fetch(`${url}/api/people`);
	let data = await res.json();
	return data;
}

async function PutQuotePeopleToDatabase(quoteId, personId) {
	await fetch(`${url}/api/quotes/assign/person`, {
		method: "PUT",
		body: JSON.stringify({
			quote_id: quoteId,
			person_id: personId
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

async function DeleteAllQuotes() {
	await fetch(`${url}/api/quotes/clear`, {
		method: "DELETE",
	})
}

async function AddPeopleConnections(quote, detailedQuote) {
	const data = detailedQuote;
	quote.people.forEach(async person => {
		let personId;
		let peopleWithIds = await GetPeopleWithIds();
		peopleWithIds.forEach(p => {
			if (p.name.toLowerCase() === person.toLowerCase()) {
				personId = p.id;
			}
		})
		if (personId) {
			await PutQuotePeopleToDatabase(data.id, personId);
			console.log(`Assigned ${person} (${personId}) to quote ${data.id}`);
		}
		else {
			console.log(`Person ${person} not found in database!`);
		}
	})
}

async function PostQuotesToDatabase() {
	if (dump.length) {
		await DeleteAllQuotes();
	}
	dump.forEach(async quote => {
		let res = await fetch(`${url}/api/quotes`, {
			method: "POST",
			body: JSON.stringify({
				content: quote.quote,
				full_quote: quote.full_quote
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		let data = await res.json();
		console.log(data[0].content);
		await AddPeopleConnections(quote, data[0]);
	})
}

PostQuotesToDatabase();