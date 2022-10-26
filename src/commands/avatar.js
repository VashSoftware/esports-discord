const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Gets a user\'s avatar'),
    async execute (interaction) {
        const user = interaction.options.getUser('user');
        return interaction.reply(`Your avatar: <${user.displayAvatarURL({ dynamic: true })}>`);
    }
}