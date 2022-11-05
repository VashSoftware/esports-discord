import { SlashCommandBuilder } from '@discordjs/builders';
import { readdirSync } from 'fs';

export const data = new SlashCommandBuilder()
  .setName('ticket')
  .setDescription('Commands for ticket handling')
  .addSubcommand(subcommand => subcommand
    .setName('create')
    .setDescription('Create a ticket')
    .addStringOption(option => option
      .setName('reason')
      .setDescription('Reason for ticket')
      .setRequired(true)
    ))
  .addSubcommand(subcommand => subcommand
    .setName('close')
    .setDescription('Close a ticket')
    .addIntegerOption(option => option
      .setName('ticketid')
      .setDescription('Ticket ID')
      .setRequired(true)
    ))
  .addSubcommand(subcommand => subcommand
    .setName('status')
    .setDescription('View the status of a ticket')
    .addIntegerOption(option => option
      .setName('ticketid')
      .setDescription('Ticket ID')
      .setRequired(true)
    ));

export function execute(interaction) {
  const matchCommands = readdirSync("./src/commands/ticket")
    .filter((file) => file.endsWith(".js"));

  matchCommands.every((command) => {
    import(command).then((command) => {
      if (command.data.name === interaction.options.getSubcommand()) {
        command.execute(interaction);
        return false;
      }
    })
  });
}