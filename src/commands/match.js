require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("match")
    .setDescription("Match command")
    .addSubcommand((subcommand) =>
      subcommand.setName("info").setDescription("Shows info about a match")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("List all matches")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("start").setDescription("Start a match")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("reschedule").setDescription("Reschedule a match")
    ),
  execute(interaction) {
    const fs = require("fs");

    const matchCommands = fs
      .readdirSync("./commands/match")
      .filter((file) => file.endsWith(".js"));

    for (const file of matchCommands) {
      const command = require(`./match/${file}`);
      if (command.name === interaction.options.getSubcommand()) {
        command.execute(interaction);
        break;
      }
    }
  },
};
