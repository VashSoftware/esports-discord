import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('roll')
  .setDescription('Rolls a random number between 1-100. Optionally, you can specify a max number.')
  .addIntegerOption(option => option.setName('max').setDescription('Max number').setRequired(false));

export async function execute(interaction) {
  let maxNumber = 100;

  if (interaction.options.getInteger('max')) {
    maxNumber = interaction.options.getInteger('max');
  }

  const roll = Math.floor(Math.random() * maxNumber) + 1;
  await interaction.reply(`${roll}`);
}