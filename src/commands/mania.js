const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mania')
        .setDescription('Get osu!mania stats for a user'),
    async execute (interaction) {
    }
}