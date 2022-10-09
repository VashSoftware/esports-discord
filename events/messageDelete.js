require("dotenv").config();

module.exports = {
    name: 'messageDelete',
    execute(message, client) {
        if(message.author.bot) return;
        
        const logChannel = client.channels.cache.get(process.env.DISCORD_LOG_CHANNEL_ID);
        logChannel.send(`Message deleted in ${message.channel} by ${message.author}:\n\n${message.content}`);
    },
};