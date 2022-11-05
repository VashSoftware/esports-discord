import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('map')
  .setDescription('Get a map\'s information from osu!');

export async function execute(interaction) {
  // TODO: Implement
}