import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('taiko')
  .setDescription('Shows the top 10 players in the taiko leaderboard.');

export async function execute(interaction) {
  // TODO: Implement
}