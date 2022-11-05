import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('emotes')
  .setDescription('Shows all the emotes in the server.');

export async function execute(interaction) {
  const emotes = interaction.guild.emojis.cache.map(e => e.toString()).join(' ');
  interaction.reply(emotes);
}