const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emotes')
        .setDescription('Shows all the emotes in the server.'),
    async execute (interaction) {
    }
}