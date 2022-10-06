const { SlashCommandBuilder } = require('discord.js');
const challonge = require('challonge');
const { challongeApiKey, subdomain } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Match info command')
        .addStringOption(option => option.setName('tournamentid').setDescription('Tournament ID').setRequired(true))
        .addStringOption(option => option.setName('matchid').setDescription('Match ID').setRequired(true)),
    async execute(interaction) {
        
        const challongeClient = challonge.createClient({
            apiKey: challongeApiKey,
            subdomain: subdomain
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