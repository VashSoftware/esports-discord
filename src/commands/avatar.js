import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('Gets a user\'s avatar')
  .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show'));

export async function execute(interaction) {
  const user = interaction.options.getUser('target');
  if (user) {
    return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
  } else {
    return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL({ dynamic: true })}`);
  }
}