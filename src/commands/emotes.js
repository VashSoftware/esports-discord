const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emotes')
        .setDescription('Shows all the emotes in the server.'),
    async execute (interaction) {
        const emotes = interaction.guild.emojis.cache.map(e => e.toString()).join(' ');
        interaction.reply(emotes);
    }
}