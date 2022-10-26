module.exports = {
    name: 'close',
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

        if (interaction.member.roles.cache.some(role => role.name === "Moderator")) {
            await knex("ticket").update({ closed: 1 }).where("id", ticketId);
            await interaction.reply({content: `Ticket ${ticketId} closed!`, ephemeral: true});
        } else {
            await interaction.reply({content: "You do not have permission to close tickets.", ephemeral: true});
        }
    }
}