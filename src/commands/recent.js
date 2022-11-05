import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('recent')
  .setDescription('Get the most recent score of a user.');

export async function execute(interaction) {
  // TODO: Implement
}