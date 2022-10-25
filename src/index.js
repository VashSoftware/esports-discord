// Imports
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const deployCommands = require("./functions/deployCommands.js");
const mysql = require('mysql');
const Banchojs = require("bancho.js");


const createDiscordClient = () => {
  return new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildScheduledEvents,
    ],
  });
}

const loadDiscordCommands = (client) => {
  client.commands = new Collection();
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
  }

  return client;
}

const loadDiscordEvents = (client) => {
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));
  let eventCount = 0;

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
    eventCount++;
  }
  console.log(`Loaded ${eventCount} events.`);

  return client;
}

const conenctToDatabase = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database!');
  });

  return connection;
}

const connectToBancho = () => {
  const banchoConnection = new Banchojs.BanchoClient({
    username: process.env.OSU_IRC_USERNAME,
    password: process.env.OSU_IRC_PASSWORD
  });

  banchoConnection.connect().then(() => {
    console.log("Connected to Bancho!");
  }).catch(console.error);

  return banchoConnection;
}

const main = () => {
  let discordClient = createDiscordClient();
  const connection = conenctToDatabase();
  const banchodiscordClient = connectToBancho();

  discordClient = loadDiscordCommands(discordClient);
  deployCommands.execute();
  discordClient = loadDiscordEvents(discordClient);

  discordClient.login(process.env.DISCORD_TOKEN);

  return { discordClient, connection, banchodiscordClient };
}

const { connection, banchodiscordClient} = main();

module.exports = {
  connection,
  banchodiscordClient
}