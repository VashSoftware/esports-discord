const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catch')
        .setDescription('Shows user info for osu!catch'),
    async execute (interaction) {
    }
}