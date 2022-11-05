// TODO: Create match start command
import banchopkg from "bancho.js";
import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { google } from 'googleapis';
import config from '../config.js';
const { BanchoClient } = banchopkg;

export const data = new SlashCommandBuilder()
  .setName('startmatch')
  .setDescription('Starts a match')
  .addNumberOption(option => option
    .setName('matchid')
    .setDescription('The match ID')
    .setRequired(true)
  );

export async function execute(interaction) {
  const matchId = interaction.options.getNumber('matchid');

  const matchDiscordChannel = await interaction.guild.channels.create({
    name: `match-${matchId}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.roles.everyone,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: interaction.member,
        allow: [PermissionFlagsBits.ViewChannel],
      }
    ],
    parent: interaction.channel.parent,
  });
  interaction.reply({ content: `Match channel created: ${matchDiscordChannel}`, ephemeral: true });

  const auth = new google.auth.GoogleAuth({
    keyFile: './keyfile.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  });
  const sheets = google.sheets({ version: 'v4', auth: auth });

  async function getSheet(spreadsheetId, range) {
    return sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });
  }

  let team1;
  let team2;

  getSheet(process.env.SPREADSHEET_ID, `Bracket Schedules (RO64)!C5:M171`).then(
    (values) => {
      values.data.values.forEach(element => {
        if (element[0] == matchId) {
          team1 = element[element.length - 4];
          team2 = element[element.length - 1];
        }
      });
    }
  );

  const banchoClient = new BanchoClient({ username: config.osu.irc_username, password: config.osu.irc_password, apiKey: config.osu.api_v1_key });
  await banchoClient.connect().then(async () => {
    const matchMultiplayerChannel = await banchoClient.createLobby(`CES: (${team1}) vs (${team2})`);

    const matchLobby = matchMultiplayerChannel.lobby;
    await matchLobby.setPassword("test");
    await matchLobby.invitePlayer(interaction.member.displayName);

    interaction.client.on("messageCreate", async (message) => {
      if (message.channel.id !== matchDiscordChannel.id) {
        return;
      }

      if (message.content === "!mp close") {
        await matchLobby.closeLobby();
        await matchDiscordChannel.delete();
        return;
      }

      await matchMultiplayerChannel.sendMessage(message.content);
    });

    banchoClient.on("CM", (message) => {
      if (message.user.ircUsername === "Stan") {
        return;
      }

      if (message.channel == matchMultiplayerChannel) {
        matchDiscordChannel.send(`${message.user.ircUsername}: ${message.message}`);
      }
    });
  }).catch(console.error);
}