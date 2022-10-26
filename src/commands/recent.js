const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recent')
        .setDescription('Get the most recent score of a user.'),
    async execute (interaction) {
    }
}