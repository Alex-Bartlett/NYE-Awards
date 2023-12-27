const { SlashCommandBuilder } = require('discord.js');
const config = require('../config.json');
const fs = require('node:fs')
const path = require('node:path');
const { log } = require('node:console');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scrape')
		.setDescription('Scrapes all the quotes from the quotes channel from 2023'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: false });

		await fetchAllMessages(interaction.client)
			.then(await interaction.editReply({ content: 'Executed', ephemeral: false }));
	}
}

async function fetchAllMessages(client) {
	const channel = client.channels.cache.get(config.ChannelID);
	let messages = [];

	// Create message pointer
	let message = await channel.messages
		.fetch({ limit: 1 })
		.then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

	while (message) {
		await channel.messages
			.fetch({ limit: 100, before: message.id })
			.then(messagePage => {
				messagePage.forEach(msg => messages.push(msg));

				// Update our message pointer to be the last message on the page of messages
				message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
			});
	}

	let quotes = [];

	messages.forEach(msg => { if (msg.content.includes("2023")) { quotes.push(msg); } });

	let date = Date.now();
	try {
		const targetPath = `./dumps/dump_${date}.txt`
		console.log(targetPath);
		fs.writeFileSync(targetPath, quotes.toString(), { flag: 'a+' });
	}
	catch (error) {
		console.error(error);
	}

}