require("dotenv").config();

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if(message.author.bot) return;

        // Log message to console
        console.log(`${message.author.username} (${message.guild.name}, #${message.channel.name}): ${message.content}`);
        
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