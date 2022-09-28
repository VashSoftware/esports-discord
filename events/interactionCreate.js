module.exports = {
	name: "interactionCreate",
	/** @param {import("discord.js").CommandInteraction} interaction */
	execute(interaction) {
		let command = interaction.client.commands.get(interaction.commandName);
		command.execute(interaction);
	},
};
