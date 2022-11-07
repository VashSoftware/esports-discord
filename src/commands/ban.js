import { SlashCommandBuilder } from '@discordjs/builders';

export const data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Bans a user')
  .addUserOption(option => option.setName('user').setDescription('User to ban').setRequired(true))
  .addStringOption(option => option.setName('reason').setDescription('Reason for ban').setRequired(true));

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const reason = interaction.options.getString('reason');

  const member = interaction.guild.members.cache.get(user.id);

  member.ban({ reason: reason }).then(interaction.reply(`Banned ${user.tag} for ${reason}`));
}