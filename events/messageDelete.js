const { logChannelId } = require('../config.json');

module.exports = {
    name: 'messageDelete',
    execute(message, client) {
        if(message.author.bot) return;
        
        const logChannel = client.channels.cache.get(logChannelId);
        logChannel.send(`Message deleted in ${message.channel} by ${message.author}:\n\n${message.content}`);
    },
};