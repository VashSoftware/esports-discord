require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("qualifier")
    .setDescription("Qualifier commands")
    // .addSubcommand((subcommand) =>
    //   subcommand.setName("create").setDescription("Creates a qualifier lobby")
    // )
    // .addSubcommand((subcommand) =>
    //   subcommand.setName("info").setDescription("Shows info about a match")
    // )
    // .addSubcommand((subcommand) =>
    //   subcommand.setName("list").setDescription("List all matches")
    // )
    // .addSubcommand((subcommand) =>
    //   subcommand.setName("start").setDescription("Start a match")
    // )
    .addSubcommand((subcommand) =>
      subcommand.setName("schedule").setDescription("Schedule for a qualifier lobby").addStringOption(option => option.setName('lobbyid').setDescription('Lobby ID').setRequired(true))
    ),
  execute(interaction) {
    const fs = require("fs");

    const matchCommands = fs
      .readdirSync("./commands/qualifier")
      .filter((file) => file.endsWith(".js"));

    for (const file of matchCommands) {
      const command = require(`./qualifier/${file}`);
      if (command.name === interaction.options.getSubcommand()) {
        command.execute(interaction);
        break;
      }
    }
  },
};
