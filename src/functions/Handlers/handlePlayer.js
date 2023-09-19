const {AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;
require('dotenv').config();
const { Player } = require('discord-player');



module.exports = (client) => {
    const player = new Player(client);
    client.handlePlayer = async () => {
        player.events.on('playerStart', (queue, track) => {
            // Emitted when the player starts to play a song
            queue.metadata.send(`Started playing: **${track.title}**`);
        });
        
    }
}