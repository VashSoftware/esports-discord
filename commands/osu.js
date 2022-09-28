const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("osu")
		.setDescription("Replies with osu! user info!"),
	async execute(interaction) {
		await interaction.reply("osu! user info!");
	},
};
