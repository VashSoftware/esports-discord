import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('bws')
  .setDescription('Calculates BWS rank')
  .addStringOption(option => option.setName('rank').setDescription('Global osu! rank').setRequired(true))
  .addStringOption(option => option.setName('badges').setDescription('Amount of tournament win badges').setRequired(true));

export async function execute(interaction) {
  const rank = interaction.options.getString('rank');
  const badges = interaction.options.getString('badges');
  const bwsRank = Math.floor(Math.pow(rank, (Math.pow(0.9937, (Math.pow(badges, 2))))));

  await interaction.reply(`BWS rank: ${bwsRank}`);
}