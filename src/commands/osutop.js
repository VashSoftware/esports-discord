const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('osutop')
        .setDescription('Get the top plays of a user'),
    async execute (interaction) {
    }
}