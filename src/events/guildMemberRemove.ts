import { EmbedBuilder } from "discord.js";

export function onGuildMemberRemove(client) {
  client.on("guildMemberRemove", (guildMember) => {
    console.log(
      `${guildMember.user.username} left server: ${guildMember.guild.name}`
    );

    let logChannel = client.channels.cache.find(
      (channel) =>
        channel.name === "logs" && channel.guild.id === guildMember.guild.id
    );

    const embed = new EmbedBuilder()
      .setTitle("Member Left")
      .setColor(0xff0000)
      .setThumbnail(guildMember.user.avatarURL())
      .addFields(
        { name: "User", value: guildMember.user.username },
        { name: "User ID", value: guildMember.user.id },
        { name: "Joined At", value: guildMember.joinedAt.toUTCString() },
        {
          name: "Account Created At",
          value: guildMember.user.createdAt.toUTCString(),
        },
        {
          name: "Member Count",
          value: guildMember.guild.memberCount.toString(),
        }
      )
      .setTimestamp();
    logChannel.send({ embeds: [embed] });
  });
}
