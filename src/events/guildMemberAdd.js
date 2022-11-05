import { EmbedBuilder } from "discord.js";
import config from "../config.js";
import { execute as _execute } from '../functions/updateMemberCountChannel.js';

export const name = 'guildMemberAdd';
export function execute(guildMember, client) {
  // Log and greeting
  console.log(`${guildMember.user.username} joined server: ${guildMember.guild.name}`);

  // Log to log channel
  const logChannel = client.channels.cache.find(channel => channel.name === "logs" && channel.guild.id === guildMember.guild.id);

  const embed = new EmbedBuilder()
    .setTitle('Member Joined')
    .setColor(65280)
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

  const generalChannel = client.channels.cache.get(config.discord.general_channel_id);
  generalChannel.send(`${guildMember} has joined the server.`);

  // Update member count channel
  _execute(client);

}