export async function onMessageCreate(client) {
  client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    // Log message to console
    console.log(
      `${message.author.username} (${message.guild.name}, #${message.channel.name}): ${message.content}`
    );
  });
}
