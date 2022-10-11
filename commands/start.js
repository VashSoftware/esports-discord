// TODO: Create match start command
require("dotenv").config();
const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const Banchojs = require("bancho.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('startmatch')
    .setDescription('Starts a match')
    .addNumberOption(option => option.setName('matchid').setDescription('The match ID').setRequired(true)),

    async execute(interaction) {
        
        const discordClient = interaction.client;

        const staffGuildId = "943915349315833866";
        const staffGuild = discordClient.guilds.cache.get(staffGuildId);

        const matchId = interaction.options.getNumber('matchid');

        const matchChannel =  await staffGuild.channels.create({
            name: `match-${matchId}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: "943915349315833866",
                    deny: [PermissionFlagsBits.ViewChannel],
                }
            ]
        });
        interaction.reply({content: `Match channel created: ${matchChannel}`, ephemeral: true });

        matchChannel.send("Match started!");


        const banchoClient = new Banchojs.BanchoClient({ username: "Stan", password: process.env.OSU_IRC_PASSWORD, apiKey: process.env.OSU_API_KEY });

        await banchoClient.connect().then(async () => {
            const matchLobby = await banchoClient.createLobby(`CES: (${"Stan"}) vs (${"Nick"})`);
            await matchLobby.join();

            discordClient.on("messageCreate", async (message) => {
                if(message.channel.id === matchChannel.id) {
                    await matchLobby.sendMessage(message.content);
                }
            });

            banchoClient.on("CM", (message) => {
                if (message.channel == matchLobby) {
                    matchChannel.send(`${message.user.ircUsername}: ${message.message}`);
                }
            });
        }).catch(console.error);
    }
};