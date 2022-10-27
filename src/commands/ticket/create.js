module.exports = {
    name: 'create',
    async execute (interaction) {
        const knex = require("knex")({
            client: "mysql",
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            },
        })

        await knex("ticket").insert({
            user_id: interaction.user.id,
            body: interaction.options.getString("reason"),
            created: new Date().toISOString(),
        });

        const ticketId = await knex("ticket").max("id as maxid").first();

        await interaction.reply({content: `Ticket created! Ticket ID: ${ticketId.maxid}`, ephemeral: true});

        const modChannel = interaction.guild.channels.cache.find(channel => channel.name === "moderator" && channel.guild.id === interaction.guild.id);
        await modChannel.send(`Ticket created by ${interaction.user} with ID ${ticketId.maxid} for reason: ${interaction.options.getString("reason")}`);
    }
}