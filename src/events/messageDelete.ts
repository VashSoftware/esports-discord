export async function onMessageDelete(client) {
  client.on("messageDelete", (message) => {
    if (message.author.bot) return;

    // Log message deletion in #logs
    const logChannel = client.channels.cache.find(
      (channel) =>
        channel.name === "logs" && channel.guild.id === message.guild.id
    );
    logChannel.send(
      `Message deleted in ${message.channel} by ${message.author}:\n\n${message.content}`
    );
  });
}
