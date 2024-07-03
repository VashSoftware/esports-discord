export function onGuildBanRemove(client) {
  client.on("guildBanRemove", (guildBan) => {
    console.log(
      `${guildBan.user.username} was unbanned from server: ${guildBan.guild.name}`
    );

    const logChannel = client.channels.cache.find(
      (channel) =>
        channel.name === "logs" && channel.guild.id === guildBan.guild.id
    );
    logChannel.send(
      `${guildBan.user.username} was unbanned from server: ${guildBan.guild.name}`
    );
  });
}
