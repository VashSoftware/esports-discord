module.exports = {
	name: 'user',
	async execute(interaction) {
		await interaction.reply(`User: ${interaction.user.tag}`);
	},
};
