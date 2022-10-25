const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('testdatabase')
    .setDescription('Tests database connection'),
    async execute(interaction) {
        const {connection} = require('../index.js');

        connection.query('SELECT * FROM user', function (error, results, fields) {
            if (error) throw error;
            interaction.reply({content: results[0].name, ephemeral: true });
        });
    }
}