const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { joinVoiceChannel, createAudioResource, NoSubscriberBehavior, createAudioPlayer, AudioPlayerStatus, generateDependencyReport } = require('@discordjs/voice');
const {Player} = require('discord-player');
require('dotenv').config();
const { TOKEN } = process.env;
const fs = require("fs");

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMembers,
	],
});

const player = new Player(client);


client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");

for (const folder of functionFolders) {
	const functionFiles = fs //reads every file inside every folder of functions folder
		.readdirSync(`./src/functions/${folder}`)
		.filter(file => file.endsWith(".js"))
	for (const file of functionFiles) //pass the client to every file
		require(`./functions/${folder}/${file}`)(client)
}

client.handleEvents();
client.handleCommands();
client.handlePlayer();

client.login(TOKEN);

