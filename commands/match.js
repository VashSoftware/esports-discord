const { SlashCommandBuilder } = require('discord.js');
const challonge = require('challonge');
const { challongeApiKey, subdomain } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('match')
		.setDescription('Match command')
		.addStringOption(option => option.setName('tournamentid').setDescription('Tournament ID').setRequired(true))
		.addStringOption(option => option.setName('matchid').setDescription('Match ID').setRequired(true))
		.addStringOption(option => option.setName('scoreteam1').setDescription('Score for Team 1').setRequired(true))
		.addStringOption(option => option.setName('scoreteam2').setDescription('Score for Team 2').setRequired(true)),
	async execute(interaction) {
		
		const challongeClient = challonge.createClient({
			apiKey: challongeApiKey,
			subdomain: subdomain
		});
		
		const tournamentId = interaction.options.getString('tournamentid');
		const matchId = interaction.options.getString('matchid');
		const scoreTeam1 = interaction.options.getString('scoreteam1');
		const scoreTeam2 = interaction.options.getString('scoreteam2');

		await challongeClient.matches.index({
			id: tournamentId,
			callback(err, data) {
				
				const matchWinnerId = scoreTeam1 > scoreTeam2 ? data[matchId].match.player1Id : data[matchId].match.player2Id;

				challongeClient.matches.update({
					id: interaction.options.getString('tournamentid'),
					matchId: data[matchId].match.id,
					match: {
						scoresCsv: scoreTeam1 + '-' + scoreTeam2,
						winnerId: matchWinnerId
					},
					callback(err, data) {
						interaction.reply(`Match ${matchId} updated!
${data.match.player1Id} ${scoreTeam1} - ${scoreTeam2} ${data.match.player2Id}`);
					}
				});

			}
		});
	},
};
