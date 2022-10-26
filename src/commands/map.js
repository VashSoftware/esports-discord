const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('Get a map\'s information from osu!'),
    async execute (interaction) {
    }
}