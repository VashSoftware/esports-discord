import config from "../config.js";

export const name = 'messageDelete';
export async function execute(message, client) {
  if (message.author.bot)
    return;

  // Set message in database as deleted
  const knex = require("knex")({
    client: "mysql",
    connection: {
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
    },
  });
  await knex("discord_message").update({ deleted: 1 }).where("id", message.id);

  // Log message deletion in #logs
  const logChannel = client.channels.cache.find(channel => channel.name === "logs" && channel.guild.id === message.guild.id);
  logChannel.send(`Message deleted in ${message.channel} by ${message.author}:\n\n${message.content}`);
}