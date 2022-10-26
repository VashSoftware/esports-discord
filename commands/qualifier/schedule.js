const { SlashCommandBuilder } = require("@discordjs/builders");
require("dotenv").config();

module.exports = {
  name: "schedule",
  async execute(interaction) {
    const knex = require("knex")({
      client: "mysql",
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      },
    });

    const team = await knex("team")
      .select()
      .where("name", interaction.member.displayName)
      .first();

    if (!team) {
      return interaction.reply({
        content: `Couldn't find your team! Check that you are registered and that your display name is the same as your osu! username`,
        ephemeral: true,
      });
    }

    const qualifierLobby = await knex("qualifier_lobby")
      .select()
      .where("name", interaction.options.getString("lobbyid"))
      .first();

    if (!qualifierLobby) {
      return interaction.reply({
        content: `Couldn't find a lobby with that ID! Check that you entered the ID correctly`,
        ephemeral: true,
      });
    }

    const previousSchedule = await knex("qualifier_registration")
      .join(
        "qualifier_lobby",
        "qualifier_registration.qualifier_lobby_id",
        "=",
        "qualifier_lobby.id"
      )
      .select()
      .where("qualifier_registration.team_id", team.id)
      .andWhere('qualifier_lobby.event_id', 7)
      .andWhere('qualifier_registration.reschedule_id', null)
      .first();

    const date = new Date();

    await knex("qualifier_registration").insert({
      team_id: team.id,
      qualifier_lobby_id: qualifierLobby.id,
      created: date.toISOString(),
    });

    if (previousSchedule) {
        await knex("qualifier_registration").update({reschedule_id: qualifierLobby.id}).where("id", previousSchedule.id);
    }

    await interaction.reply({
      content: `Your team has been registered for qualifier lobby ${qualifierLobby.id}!`,
      ephemeral: true,
    });
  },
};
