# What is NYE Awards?

A digitalisation of a yearly tradition with friends, NYE Awards is a voting and presentation platform for quotes (traditionally presented on New Years Eve (NYE)). Record quotes to a discord channel over the year, and then use the discord bot to scrape them and upload them to a database. Get users to vote for their favourites, progress through rounds, and present the winners at the end!

# Getting Started

## Prerequisites

- A Discord server with a quotes channel. Quotes should be formatted as `"[quote]" - [name(s)] [year]` e.g _"Example" - Alex, 2023._
- NYE awards uses Supabase's client library, so a Supabase database is required. Expect a setup script soon, but for now see [Database Setup](#database-setup).



## Setup

1. Clone this repository `git clone https://github.com/Alex-Bartlett/NYE-Awards`
2. Set up the scraper bot. [Guide](DiscordQuoteScraperBot/README.md).
3. Generate the quotes dump with `/scrape`
4. Copy the outputted dump to QuoteFileProcessor/dump
5. Configure the web app:

	`cd WebApp/app`

	`cp .env.example .env`

	Edit the .env to include your Supabase URLs and game id (default is 1)

6. Start the web app:

	`npm install`

	`npm run dev --host`

7. Process and upload the quotes:
	
	`cd ../../QuoteFileProcessor`

	`node process.js`

	`node post.js`

8. Set up your login in the database, then get you're good to go!


# Database Setup

_sorry, this will be added soon_