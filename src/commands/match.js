import { SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";

export const data = new SlashCommandBuilder()
  .setName("match")
  .setDescription("Match command")
  .addSubcommand((subcommand) => subcommand.setName("info").setDescription("Shows info about a match"))
  .addSubcommand((subcommand) => subcommand.setName("list").setDescription("List all matches"))
  .addSubcommand((subcommand) => subcommand.setName("start").setDescription("Start a match"))
  .addSubcommand((subcommand) => subcommand.setName("reschedule").setDescription("Reschedule a match"));

export function execute(interaction) {
  const matchCommands = readdirSync("./src/commands/match").filter((file) => file.endsWith(".js"));

  matchCommands.every((file) => {
    import(file).then((command) => {
      if (command.data.name === interaction.options.getSubcommand()) {
        command.execute(interaction);
        return false;
      }
    });
  });
}
