import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('catch')
  .setDescription('Shows user info for osu!catch');

export async function execute(interaction) {
  // TODO: Implement
}