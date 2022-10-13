require("dotenv").config();

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if(message.author.bot) return;

        // Log message to console
        console.log(`${message.author.username} (${message.guild.name}, #${message.channel.name}): ${message.content}`);

        // Log message to database
        const {connection} = require('../index.js');
        const sql = `INSERT INTO message (id, author_discord_id, guild_id, channel_id, content) VALUES ('${message.id}', '${message.author.id}', '${message.guild.id}', '${message.channel.id}', '${message.content}')`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
        });
        
        // Counting channel automod
        if(message.channel.id === process.env.DISCORD_COUNT_CHANNEL_ID) {            
            message.channel.messages.fetch({ limit: 2 }).then(messages => {
                if (Number.parseInt(messages.at(1).content) + 1 !== Number.parseInt(messages.at(0).content)) {
                    message.delete();
                    console.log(`Deleted message from ${message.author.username} in counting channel`);
                }
            });
        }
    },
};