const { Client, GatewayIntentBits, Attachment } = require('discord.js');
const { joinVoiceChannel, createAudioResource, NoSubscriberBehavior, createAudioPlayer } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
require('dotenv').config()


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
  ]
});


/*
client.on('messageCreate', async (message) => {
  if (!message.guild) return;

  if (message.content.startsWith('!play')) {
    // Verifica se l'utente si trova in un canale vocale
    if (!message.member.voice.channel) {
      return message.reply('Devi essere in un canale vocale per riprodurre la musica!');
    }

    // Verifica se il bot ha il permesso di entrare nel canale vocale
    if (!message.guild.me.permissions.has('CONNECT') || !message.guild.me.permissions.has('SPEAK')) {
      return message.reply('Non ho il permesso di entrare nel tuo canale vocale!');
    }

    // Ottiene l'URL del video da riprodurre
    const args = message.content.split(' ');
    const videoURL = args[1];

    const player = createAudioPlayer();

    // Crea l'audio resource del video
    try {
      const resource = createAudioResource(ytdl(videoURL, { filter: 'audioonly' }), { inlineVolume: true });
      // Connette il bot al canale vocale
      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
      });

      // Riproduce la musica

      connection.subscribe(player);
      player.play(resource);
      player.on('error', error => {
        console.error(error);
        message.reply('Si è verificato un errore durante la riproduzione della musica!');
      });

      // Avvisa quando il video è stato completamente riprodotto
      player.on(NoSubscriberBehavior.Play, () => {
        message.reply('La riproduzione della musica è terminata!');
        connection.destroy();
      });
    }
    catch (error) {
      console.log(error)
    }
  }
});
*/

client.on("ready", () => {
  console.log(client.user.username)
})

client.login(process.env.TOKEN);
