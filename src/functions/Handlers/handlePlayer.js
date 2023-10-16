require('dotenv').config();
const {useMainPlayer} = require('discord-player');



module.exports = (client) => {
    const player = useMainPlayer();
    client.handlePlayer = async () => {
        player.events.on('playerStart', (queue, track) => {
            // Emitted when the player starts to play a song
            queue.metadata.channel.send(`Started playing: **${track.title}**`);
        });
    }
}