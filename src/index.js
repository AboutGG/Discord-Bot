const { Client, GatewayIntentBits, Attachment } = require('discord.js');
const { joinVoiceChannel, createAudioResource, NoSubscriberBehavior, createAudioPlayer, generateDependencyReport } = require('@discordjs/voice');
require('dotenv').config();
const { video_basic_info, stream } = require('play-dl');

const PREFIX = "!";
var servers = {};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});


client.on('messageCreate', async message => {

  if (message.content.startsWith('!play')) {
      
      if (!message.member.voice?.channel) return message.channel.send('Connect to a Voice Channel')
      
      const connection = joinVoiceChannel({
          channelId: message.member.voice.channel.id,
          guildId: message.guild.id,
          adapterCreator: message.guild.voiceAdapterCreator
      })

      let args = message.content.split('play ')[1].split(' ')[0]

      let streamData = await play.stream(args)
      
      /*
      OR if you want to get info about youtube link and then stream it
      let yt_info = await play.video_info(args)
      console.log(yt_info.video_details.title) 
      let stream = await play.stream_from_info(yt_info)
      */

      let resource = createAudioResource(streamData.stream, {
          inputType: streamData.type
      })

      let player = createAudioPlayer({
          behaviors: {
              noSubscriber: NoSubscriberBehavior.Play
          }
      })
      
      player.play(resource)

      connection.subscribe(player)
  }
})

client.on("ready", () => {
  console.log(client.user.username)
})

client.login(process.env.TOKEN);
