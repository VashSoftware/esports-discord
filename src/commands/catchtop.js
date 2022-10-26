const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('catchtop')
        .setDescription('Shows the top plays for a user in osu!catch'),
    async execute (interaction) {
    }
}