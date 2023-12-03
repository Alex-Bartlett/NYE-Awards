# Setup
1. Create a bot with adminstrator privileges and the following intents:
	- bot
	- applications.commands
	- messages.read

2. Copy the example config:

	`cp exampleconfig.json config.json`

3. Change placeholder values to your bot and server's respectfully
4. Invite the bot to your server

# To run
`cd DiscordQuoteScraperBot`

`npm install`

`node deploy-commands`

`node .`

In the discord server, type `/scrape`. The bot will put the output in the /dumps folder.
