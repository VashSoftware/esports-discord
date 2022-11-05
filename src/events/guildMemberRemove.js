import { EmbedBuilder } from "discord.js";
import { execute as _execute } from '../functions/updateMemberCountChannel.js';

export const name = 'guildMemberRemove';
export function execute(guildMember, client) {
  console.log(`${guildMember.user.username} left server: ${guildMember.guild.name}`);

  let logChannel = client.channels.cache.find(channel => channel.name === "logs" && channel.guild.id === guildMember.guild.id);

  const embed = new EmbedBuilder()
    .setTitle('Member Left')
    .setColor(16711680)
    .setThumbnail(guildMember.user.avatarURL())
    .addFields(
      { name: 'User', value: guildMember.user.username },
      { name: 'User ID', value: guildMember.user.id },
      { name: 'Joined At', value: guildMember.joinedAt.toUTCString() },
      { name: 'Account Created At', value: guildMember.user.createdAt.toUTCString() },
      { name: 'Member Count', value: guildMember.guild.memberCount.toString() }
    )
    .setTimestamp();
  logChannel.send({ embeds: [embed] });

  _execute(client);
}