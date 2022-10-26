require("dotenv").config();

module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        if(message.author.bot) return;

        // Set message in database as deleted
        const knex = require("knex")({
            client: "mysql",
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            },
        })
        await knex("discord_message").update({ deleted: 1 }).where("id", message.id);
        
        // Log message deletion in #logs
        const logChannel = client.channels.cache.find(channel => channel.name === "logs" && channel.guild.id === message.guild.id);
        logChannel.send(`Message deleted in ${message.channel} by ${message.author}:\n\n${message.content}`);
    },
};