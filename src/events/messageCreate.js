require("dotenv").config();

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if(message.author.bot) return;

        // Log message to console
        console.log(`${message.author.username} (${message.guild.name}, #${message.channel.name}): ${message.content}`);

        // Log message to database
        const knex = require("knex")({
            client: "mysql",
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            },
        })
        try {
            await knex("discord_message").insert({
            id: message.id,
            author_discord_id: message.author.id,
            guild_id: message.guild.id,
            channel_id: message.channel.id,
            content: message.content
            });
        } catch (err) {
            console.log(err);
        }
        
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