import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('osutop')
  .setDescription('Get the top plays of a user');

export async function execute(interaction) {
  // TODO: Implement
}