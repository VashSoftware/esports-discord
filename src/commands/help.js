import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Shows a list of all commands.');

export async function execute(interaction) {
  // TODO: Implement
}