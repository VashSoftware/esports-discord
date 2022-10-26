require("dotenv").config();

module.exports = {
    name: 'messageDelete',
    execute(message, client) {
        if(message.author.bot) return;

        // Set message in database as deleted
        const {connection} = require('../index.js');
        const sql = `UPDATE message SET deleted = 1 WHERE id = '${message.id}'`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
        });
        
        const logChannel = client.channels.cache.get(process.env.DISCORD_LOG_CHANNEL_ID);
        logChannel.send(`Message deleted in ${message.channel} by ${message.author}:\n\n${message.content}`);
    },
};