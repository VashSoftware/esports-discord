const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("reportscore")
		.setDescription("Reports a match score"),
	async execute(interaction) {
		await interaction.reply("score reported!");
	},
};
