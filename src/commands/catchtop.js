import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('catchtop')
  .setDescription('Shows the top plays for a user in osu!catch');

export async function execute(interaction) {
  // TODO: Implement
}