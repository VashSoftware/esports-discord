import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('mania')
  .setDescription('Get osu!mania stats for a user');

export async function execute(interaction) {
  // TODO: Implement
}