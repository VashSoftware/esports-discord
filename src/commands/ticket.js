const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Commands for ticket handling')
        .addSubcommand(subcommand => subcommand.setName('create').setDescription('Create a ticket').addStringOption(option => option.setName('reason').setDescription('Reason for ticket').setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName('close').setDescription('Close a ticket').addIntegerOption(option => option.setName('ticketid').setDescription('Ticket ID').setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName('status').setDescription('View the status of a ticket').addIntegerOption(option => option.setName('ticketid').setDescription('Ticket ID').setRequired(true))),
    execute (interaction) {
        const fs = require("fs");

        const matchCommands = fs
          .readdirSync("./src/commands/ticket")
          .filter((file) => file.endsWith(".js"));
    
        for (const file of matchCommands) {
          const command = require(`./ticket/${file}`);
          if (command.name === interaction.options.getSubcommand()) {
            command.execute(interaction);
            break;
          }
        }
    }
}