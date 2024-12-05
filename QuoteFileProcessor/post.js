// Import quotes
// Update as necessary
const apiUrl = 'http://localhost:5173'
const apiKey = 'API KEY HERE'

// Get most recent dump
const fs = require('fs');
const path = require('path');
const outputDir = path.join(__dirname, "output");
// Sort by name (using the unix time)
const dumpFile = fs.readdirSync(outputDir)
	.filter(f => f.endsWith('json'))
	.sort((a, b) => b.localeCompare(a))[0];

const dump = require(path.join(outputDir, dumpFile));

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
	let res = await fetch(`${apiUrl}/api/people`, {
		headers: {
			'api-key': apiKey
		}
	});
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
			let res = await fetch(`${apiUrl}/api/people`, {
				method: "POST",
				body: JSON.stringify({
					name: person
				}),
				headers: {
					'Content-Type': 'application/json',
					'api-key': apiKey
				}
			});
			let data = await res.json();
			console.log(data);
		}
	});
}

PostPeopleToDatabase();

async function GetPeopleWithIds() {
	let res = await fetch(`${apiUrl}/api/people`, {
		headers: {
			'api-key': apiKey
		}
	});
	let data = await res.json();
	return data;
}

async function PutQuotePeopleToDatabase(quoteId, personId) {
	await fetch(`${apiUrl}/api/quotes/assign/person`, {
		method: "PUT",
		body: JSON.stringify({
			quote_id: quoteId,
			person_id: personId
		}),
		headers: {
			'Content-Type': 'application/json',
			'api-key': apiKey
		}
	});
}

async function DeleteAllQuotes() {
	await fetch(`${apiUrl}/api/quotes/clear`, {
		method: "DELETE",
		headers: {
			'api-key': apiKey
		}
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
		let res = await fetch(`${apiUrl}/api/quotes`, {
			method: "POST",
			body: JSON.stringify({
				content: quote.quote,
				full_quote: quote.full_quote,
				round: 1
			}),
			headers: {
				'Content-Type': 'application/json',
				'api-key': apiKey
			}
		});
		let data = await res.json();
		console.log(data.content);
		await AddPeopleConnections(quote, data);
	})
}

PostQuotesToDatabase();