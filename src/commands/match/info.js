require("dotenv").config();
const { SlashCommandBuilder } = require('discord.js');
const challonge = require('challonge');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Match info command')
        .addStringOption(option => option.setName('tournamentid').setDescription('Tournament ID').setRequired(true))
        .addStringOption(option => option.setName('matchid').setDescription('Match ID').setRequired(true)),
    async execute(interaction) {
        
        const challongeClient = challonge.createClient({
            apiKey: process.env.CHALLONGE_API_KEY,
            subdomain: process.env.CHALLONGE_SUBDOMAIN
        });

        const tournamentId = interaction.options.getString('tournamentid');
        const matchId = interaction.options.getString('matchid');

        await challongeClient.matches.show({
            id: tournamentId,
            matchId: matchId,
            callback(err, data) {               
                interaction.reply(data.match);
            }
        });

    },
};