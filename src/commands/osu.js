require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const { v2, auth } = require('osu-api-extended');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("osu")
		.setDescription("Replies with osu! user info!")
		.addStringOption(option => option.setName("username").setDescription("osu! username")),
	async execute(interaction) {
		await auth.login(process.env.OSU_CLIENT_ID, process.env.OSU_CLIENT_SECRET);

		const username = interaction.options.getString("username") !== null ? interaction.options.getString("username") : interaction.user.username;

		const user = await v2.user.details(username, 'osu');
		
		await interaction.reply(
`osu! user info for ${user.username}:

**Rank:** ${user.statistics.global_rank}
**PP:** ${user.statistics.pp}
**Accuracy:** ${user.statistics.hit_accuracy}
**Playcount:** ${user.statistics.play_count}
**Level:** ${user.statistics.level.current}
**Country Rank:** ${user.statistics.country_rank}
**Country:** ${user.country.name}`);
		
	},
};
