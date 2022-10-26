const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('taiko')
        .setDescription('Shows the top 10 players in the taiko leaderboard.'),
    async execute (interaction) {
    }
}