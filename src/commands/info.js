import { SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";

export const data = new SlashCommandBuilder()
  .setName("info")
  .setDescription("Info commands")
  .addSubcommand((subcommand) => subcommand.setName("bot").setDescription("Gives info about the bot"))
  .addSubcommand((subcommand) => subcommand.setName("server").setDescription("Gives info about the server"))
  .addSubcommand((subcommand) => subcommand.setName("user").setDescription("Gives info about the user")
    .addUserOption((option) => option.setName("target").setDescription("The user to get info about")));

export function execute(interaction) {

  const matchCommands = readdirSync("./src/commands/info").filter((file) => file.endsWith(".js"));

  for (const file of matchCommands) {
    const command = require(`./info/${file}`);
    if (command.name === interaction.options.getSubcommand()) {
      command.execute(interaction);
      break;
    }
  }
}
