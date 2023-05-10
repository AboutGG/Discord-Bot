const { Client, GatewayIntentBits, Attachment, Collection } = require('discord.js');
const { joinVoiceChannel, createAudioResource, NoSubscriberBehavior, createAudioPlayer,  AudioPlayerStatus,generateDependencyReport } = require('@discordjs/voice');
require('dotenv').config();
const { video_basic_info, stream, yt_validate, search } = require('play-dl');
const PREFIX = "!";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();

const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  }
})

client.on('messageCreate', async message => {

  let args = splitString(message.content)

  switch (args[0]) {
    case "!play":
      if (!message.member.voice?.channel) return message.channel.send('Connect to a Voice Channel')

      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
      })

      let streamData;

      if (args[1].startsWith('https') && yt_validate(args[1]) === 'video'){
        streamData = await stream(args[1])
      }
      else {
        let yt_info = await search(args[1], {
          limit: 1
        }) 
        streamData = await stream(yt_info[0].url)
      }

      let resource = createAudioResource(streamData.stream, {
        inputType: streamData.type
      })

      player.play(resource)

      connection.subscribe(player)
      break;

      case "!stop":
        player.stop();
      break;
  }

});

player.on(AudioPlayerStatus.Playing, () => {
	console.log('The audio player has started playing!');
});

/*
client.on('messageCreate', async message => {

  if (message.content.startsWith('!play')) {

    if (!message.member.voice?.channel) return message.channel.send('Connect to a Voice Channel')

    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator
    });

    let args = message.content.split('play ')[1].split(' ')[0];
    if (yt_validate(args)) {

      let streamData = await stream(args)

      /*
      OR if you want to get info about youtube link and then stream it
      let yt_info = await play.video_info(args)
      console.log(yt_info.video_details.title) 
      let stream = await play.stream_from_info(yt_info)
      

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

  }
})
*/
client.on("ready", () => {
  console.log(client.user.username)
})

client.login(process.env.TOKEN);

function splitString(str) {
  let splitStr = str.trim().split(/\s+/);
  let result = [splitStr.shift(), splitStr.join(' ')];
  return result;
}