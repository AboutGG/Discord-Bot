const { Client, GatewayIntentBits, Attachment } = require('discord.js');
const { joinVoiceChannel, createAudioResource, NoSubscriberBehavior, createAudioPlayer, generateDependencyReport } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
require('dotenv').config()

const PREFIX = "!";
var servers = {};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
  ],
});


client.on("messageCreate", (message) => {

  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {

    case "play":

      if (args[1] == null)
        return message.reply('Put the link bestia!');
      if (!message.member.voice.channel)
        return message.reply('Devi essere in un canale vocale per riprodurre la musica!');

      if (!message.guild.voiceConnection) {
        const player = createAudioPlayer();
        const connection = joinVoiceChannel({
          channelId: message.member.voice.channel.id,
          guildId: message.guild.id,
          adapterCreator: message.guild.voiceAdapterCreator
        });
        const stream = createAudioResource(ytdl(args[1], { filter: 'audioonly' }));
        player.play(stream);
        connection.subscribe(player);
        player.on('error', error => {
          console.error('Errore durante la riproduzione dell\'audio:', error);
          console.log(generateDependencyReport());
        });
      }
      break;
  }
});

client.on("ready", () => {
  console.log(client.user.username)
})

client.login(process.env.TOKEN);
