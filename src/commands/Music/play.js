const { SlashCommandBuilder } = require("discord.js")
const { joinVoiceChannel, createAudioResource, NoSubscriberBehavior, createAudioPlayer, AudioPlayerStatus, generateDependencyReport } = require('@discordjs/voice');
const { video_basic_info, stream, yt_validate, search, YouTubeChannel, playlist_info, validate, stream_from_infoW } = require('play-dl');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Lets u play a song!")
        .addStringOption(option =>
            option.setName('song')
                .setDescription('Put the song name')
                .setRequired(true)),
    async execute(interaction, client) {

        const args = await interaction.options.getString(`song`);
        let video, resource;

        switch (await validate(args)) {
                case "yt_playlist":

                    break;
            
                case "yt_video":
                    video = await stream(args);

                    resource = createAudioResource(video.stream, {
                        inputType: video.type
                    });
                    
                    break;
            
                case 'search':
                    let yt_info = await search(args, {
                        limit: 1
                    });

                    video = await stream(yt_info[0].url);

                    resource = createAudioResource(video.stream, {
                        inputType: video.type
                    });
                    break;
                   
                default:
                   
                    break;
        }

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });
        
        client.player.play(resource);

        connection.subscribe(client.player);
    

        // const playlist = await playlist_info(args, { incomplete: true })
        //
        // const videos = await playlist.all_videos() //Validate understand what it is playlist|song|channel
        //
        // let yt_info = await search(args, {
        //     source: { youtube: "playlist" }
        // });
        //
        // client.player.queue.push(...videos)
        //
       
        //
        //
        // // let streamData = await stream(videos[0].url);
        //
        // //console.log(videos[0].url);
        //
      
        //
       

        let newMessage = 'Now playing';

        await interaction.reply({
            content: newMessage,
        });
    }
}