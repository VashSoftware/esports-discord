const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('maniatop')
        .setDescription('Get the top scores of a mania player'),
    async execute (interaction) {
    }
}