import type { Client } from "discord.js";

export function onGuildBanAdd(client: Client) {
  client.on("guildBanAdd", (guildBan) => {
    console.log(
      `${guildBan.user.username} was banned from server: ${guildBan.guild.name}`
    );

    const logChannel = client.channels.cache.find(
      (channel) =>
        channel.name === "logs" && channel.guild.id === guildBan.guild.id
    );

    if (!logChannel) {
      return;
    }

    logChannel.send(
      `${guildBan.user.username} was banned from server: ${guildBan.guild.name}`
    );
  });
}
