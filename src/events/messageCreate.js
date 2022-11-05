import config from '../config.js';
import { createConnection } from 'mysql';

export const name = 'messageCreate';
export function execute(message, client) {
  if (message.author.bot)
    return;

  // Log message to console
  console.log(`${message.author.username} (${message.guild.name}, #${message.channel.name}): ${message.content}`);

  // Log message to database
  const connection = createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
  });
  const sql = `INSERT INTO discord_message (id, author_discord_id, guild_id, channel_id, content) VALUES ('${message.id}', '${message.author.id}', '${message.guild.id}', '${message.channel.id}', '${message.content}')`;
  connection.query(sql, function (error, results, fields) {
    if (error)
      throw error;
  });

  // Counting channel automod
  if (message.channel.id === config.discord.count_channel_id) {
    message.channel.messages.fetch({ limit: 2 }).then(messages => {
      if (Number.parseInt(messages.at(1).content) + 1 !== Number.parseInt(messages.at(0).content)) {
        message.delete();
        console.log(`Deleted message from ${message.author.username} in counting channel`);
      }
    });
  }
}