// Imports
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const deployCommands = require("./functions/deployCommands.js");

// Create a new discordClient instance
const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildBans,
  ],
});

// Commands
discordClient.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  discordClient.commands.set(command.data.name, command);
}
deployCommands.execute();


// Events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));
let eventCount = 0;

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    discordClient.once(event.name, (...args) => event.execute(...args, discordClient));
  } else {
    discordClient.on(event.name, (...args) => event.execute(...args, discordClient));
  }
  eventCount++;
}
console.log(`Loaded ${eventCount} events.`);

// Connect to database
const mysql = require('mysql');
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

// Connect to Bancho
const Banchojs = require("bancho.js");
const banchodiscordClient = new Banchojs.BanchoClient({ username: process.env.OSU_IRC_USERNAME, password: process.env.OSU_IRC_PASSWORD });

banchodiscordClient.connect().then(() => {
    console.log("Connected to Bancho!");
}).catch(console.error);

module.exports = {
    connection,
    banchodiscordClient
};

// Login to Discord
discordClient.login(process.env.DISCORD_TOKEN);
