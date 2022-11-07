import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('kick')
  .setDescription('Kicks a user')
  .addUserOption(option => option.setName('user').setDescription('User to kick').setRequired(true))
  .addStringOption(option => option.setName('reason').setDescription('Reason for kick').setRequired(true));

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const reason = interaction.options.getString('reason');

  const member = interaction.guild.members.cache.get(user.id);

  member.kick({ reason: reason }).then(interaction.reply(`Kicked ${user.tag} for ${reason}`));
}