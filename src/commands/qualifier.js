import { SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";

export const data = new SlashCommandBuilder()
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
  .addSubcommand((subcommand) => subcommand
    .setName("schedule")
    .setDescription("Schedule for a qualifier lobby")
    .addStringOption(option => option.setName('lobbyid')
      .setDescription('Lobby ID')
      .setRequired(true))
  );

export function execute(interaction) {
  const matchCommands = readdirSync("./src/commands/qualifier")
    .filter((file) => file.endsWith(".js"));

  matchCommands.every((command) => {
    import(command).then((command) => {
      if (command.data.name === interaction.options.getSubcommand()) {
        command.execute(interaction);
        return false;
      }
    });
  });
}
