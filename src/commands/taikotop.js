import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('taikotop')
  .setDescription('Shows the top 10 players in osu!taiko.');

export async function execute(interaction) {
  // TODO: Implement
}