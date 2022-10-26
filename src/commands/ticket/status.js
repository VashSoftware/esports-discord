module.exports = {
    name: 'status',
    async execute(interaction) {
        const ticketId = interaction.options.getInteger("ticketid");

        const knex = require("knex")({
            client: "mysql",
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            },
        })

        const ticket = await knex("ticket").where("id", ticketId).first();
        await interaction.reply({content: `Ticket ${ticketId} is ${ticket.closed ? "closed" : "open"}`, ephemeral: true});
    }
}