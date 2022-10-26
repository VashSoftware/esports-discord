const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('taikotop')
        .setDescription('Shows the top 10 players in osu!taiko.'),
    async execute (interaction) {
    }
}