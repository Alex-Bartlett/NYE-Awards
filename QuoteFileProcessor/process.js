const fs = require('fs');
const path = require('path');
const dumpFilePath = './dump';
const outputFolder = './output';

const people = ['alex', 'aaran', 'lewis', 'tom', 'jamie', 'harry', 'maisie', 'reece', 'luke', 'max', 'mason', 'rob', 'ben', 'matt', 'ed', 'isaac'];


function ReadFile() {
    const files = fs.readdirSync(dumpFilePath);
    if (!files.length) { throw new Error('No dump files found'); }
    const targetPath = files[0];

    const dump = fs.readFileSync(path.join(dumpFilePath, targetPath), 'utf-8');

    const messages = dump.split(',');

    const fixedMessages = AttemptToConcat(messages);
    let quotes = [];
    for (msg of fixedMessages) {
        quotes.push(GetQuoteFromMessage(msg));
    }
    Output(quotes);
}

function AttemptToConcat(messages) {
    const str = "Hello";
    const fixedMessages = []
    const lastMessageIndex = 0;
    for (i in messages) {
        let msg = messages[i];
        if (msg.startsWith('"') || msg.startsWith('“') || msg.startsWith('>>>')) {
            if (msg.startsWith('>>>')) {
                fixedMessages.push(msg.slice(4))
            }
            else {
                fixedMessages.push(msg);
            }
        }
        else {
            const fixedMsg = fixedMessages.pop().concat([',', msg]);
            fixedMessages.push(fixedMsg);
        }
    }
    for (i in fixedMessages) {
        let msg = fixedMessages[i]
        // Remove weird speech marks
        if (msg.includes('“') || msg.includes(',,')) {
            msg = msg.replace('“', '"');
            msg = msg.replace('”', '"');
            msg = msg.replace(',,', ',');
            fixedMessages[i] = msg;
        }
    }
    return fixedMessages;
}

function Output(content) {
    const date = Date.now();
    fs.writeFileSync(path.join(outputFolder, `quotes_${date}.json`), JSON.stringify(content));
}

function GetQuoteFromMessage(msg) {
    const start = msg.indexOf('"');
    const end = msg.lastIndexOf('"');
    const quote = msg.substring(start, end + 1);
    const trimmings = msg.substring(end);

    const people = FindPeopleInString(trimmings);

    const quoteObj = {
        full_quote: msg,
        quote: quote,
        people: people
    }

    return quoteObj;
}

function FindPeopleInString(string) {
    let foundPeople = [];
    for (person of people) {
        if (string.toLowerCase().includes(person)) {
            foundPeople.push(person);
        }
    }
    return foundPeople;
}

ReadFile();