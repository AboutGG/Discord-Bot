const { SlashCommandBuilder } = require("discord.js")
// const { joinVoiceChannel, NoSubscriberBehavior, createAudioPlayer, AudioPlayerStatus, generateDependencyReport } = require('@discordjs/voice');
// const { video_basic_info, stream, yt_validate, search, YouTubeChannel, playlist_info, validate, stream_from_info, YouTubeVideo } = require('play-dl');
const { useMainPlayer /*, QueryType, QueueRepeatMode, ExtractorModel*/ } = require('discord-player');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Lets u play a song!")
        .addStringOption(option =>
            option.setName('song')
                .setDescription('Put the song name')
                .setRequired(true)),
    async execute(interaction) {
        const player = useMainPlayer();
        const query = interaction.options.getString('song', true);
        const voiceChannel  = interaction.member.voice.channel;
        if (!voiceChannel)
            return interaction.reply('You are not connected to a voice channel!');



        // let's defer the interaction as things can take time to process
        await interaction.deferReply();

        try {
            const { track } = await player.play(voiceChannel, query, {
                nodeOptions: {
                    // nodeOptions are the options for guild node (aka your queue in simple word)
                    metadata: interaction // we can access this metadata object using queue.metadata later on
                }
            });

            return interaction.followUp(`**${track.title}** enqueued!`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Something went wrong: ${e}`);
        }

        // let searchResult = await player
        //     .search(query, {
        //         requestedBy: interaction.author,
        //         searchEngine: QueryType.AUTO
        //     })
        //     .catch(() => {});
        // if (!searchResult || !searchResult.tracks.length)
        //     return interaction.channel.send('No results were found!');
        //
        // let queue = await player.createQueue(interaction.guild, {
        //     metadata: interaction
        // });
        //
        // try {
        //     if (!queue.connection) await queue.connect(voiceChannel);
        // } catch {
        //     void player.deleteQueue(interaction.guild.id);
        //     return void interaction.reply({ content: 'Could not join your voice channel!', ephemeral: true });
        // }
        //
        // await interaction.reply({ content: `🎵 | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
        // searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        // if (!queue.playing) await queue.play();
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