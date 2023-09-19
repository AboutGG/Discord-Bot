const { SlashCommandBuilder } = require("discord.js")
const { joinVoiceChannel, NoSubscriberBehavior, createAudioPlayer, AudioPlayerStatus, generateDependencyReport } = require('@discordjs/voice');
const { video_basic_info, stream, yt_validate, search, YouTubeChannel, playlist_info, validate, stream_from_info, YouTubeVideo } = require('play-dl');
const { useMainPlayer, QueryType, QueueRepeatMode, ExtractorModel } = require('discord-player');
const { YouTubeExtractor } = require('@discord-player/extractor');



module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Lets u play a song!")
        .addStringOption(option =>
            option.setName('song')
                .setDescription('Put the song name')
                .setRequired(true)),
    //async execute(interaction, client) {

    //     const player = useMainPlayer();
    //     const args = await interaction.options.getString(`song`);

    //     let video, resource, yt_info;

    //     switch (await validate(args)) {
    //             case "yt_playlist":
    //                 yt_info = await (await playlist_info(args)).all_videos();

    //                 yt_info.forEach(async element =>
    //                     {
    //                         console.log(element)
    //                         video = await stream_from_info(element);
    //                     })


    //                 resource = createAudioResource(video.stream, {
    //                     inputType: video.type
    //                 });
    //                 break;

    //             case "yt_video":
    //                 video = await stream(args);

    //                 resource = createAudioResource(video.stream, {
    //                     inputType: video.type
    //                 });

    //                 break;

    //             case 'search':
    //                 yt_info = await search(args, {
    //                     limit: 1
    //                 });

    //                 video = await stream(yt_info[0].url);

    //                 resource = createAudioResource(video.stream, {
    //                     inputType: video.type
    //                 });
    //                 break;

    //             default:

    //                 break;
    //     }

    //     const connection = joinVoiceChannel({
    //         channelId: interaction.member.voice.channel.id,
    //         guildId: interaction.guild.id,
    //         adapterCreator: interaction.guild.voiceAdapterCreator
    //     });

    //     player.play(resource);

    //     connection.subscribe(player);
    //     const queue = player.nodes.create({...}); // create guild queue


    //     let newMessage = 'Now playing';

    //     await interaction.reply({
    //         content: newMessage,
    //     });
    // }
    async execute(interaction) {
        const player = useMainPlayer();
        const query = interaction.options.getString('song');
        



        let searchResult = await player
            .search(query, {
                requestedBy: interaction.author,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {});
        if (!searchResult || !searchResult.tracks.length)
            return interaction.channel.send('No results were found!');

        let queue = await player.createQueue(interaction.guild, {
            metadata: interaction
        });

        try {
            if (!queue.connection) await queue.connect(voiceChannel);
        } catch {
            void player.deleteQueue(interaction.guild.id);
            return void interaction.reply({ content: 'Could not join your voice channel!', ephemeral: true });
        }

        await interaction.reply({ content: `🎵 | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    }
       
        // if (!searchResult.hasTracks()) {
        //     //Check if we found results for this query
        //     await interaction.reply(`We found no tracks for ${query}!`);
        //     return;
        // } else {
        //     await player.play(interaction.member.voice.channel, searchResult, {
        //         nodeOptions: {
        //             metadata: interaction.channel
        //             //You can add more options over here
        //         }
        //     });
        // }
      
}