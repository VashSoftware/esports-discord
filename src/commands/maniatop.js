import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('maniatop')
  .setDescription('Get the top scores of a mania player');

export async function execute(interaction) {
  // TODO: Implement
}