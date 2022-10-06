const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Gives you information about yourself.'),
	async execute(interaction) {
		await interaction.reply(`User: ${interaction.user.tag}`);
	},
};
