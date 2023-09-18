const {AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;
require('dotenv').config();

module.exports = (client) => {
    client.handlePlayer = async () => {
        client.player.on(AudioPlayerStatus.Playing, () => {
            //console.log(client.player.queue);
            const connection = getVoiceConnection(GUILD_ID);
            //console.log(connection);
        });

        
    }
}