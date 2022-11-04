import banchopkg from "bancho.js";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import { createConnection } from 'mysql';
import { join } from "path";
import { fileURLToPath } from "url";
import config from "./config.js";
import { execute } from "./functions/deployCommands.js";
const { BanchoClient } = banchopkg;

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

const loadDiscordCommands = (discordClient) => {
  discordClient.commands = new Collection();
  const commandsPath = fileURLToPath(new URL("./commands", import.meta.url));
  const commandFiles = readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);

    import(filePath).then((command) => 
      discordClient.commands.set(command.data.name, command));
  }

  return discordClient;
}

const loadDiscordEvents = (discordClient) => {
  const eventsPath = fileURLToPath(new URL("./events", import.meta.url));
  const eventFiles = readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));
    
  let eventCount = 0;
  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    import(filePath).then((event) => {
      if (event.once) {
        discordClient.once(event.name, (...args) => event.execute(...args, discordClient));
      } else {
        discordClient.on(event.name, (...args) => event.execute(...args, discordClient));
      }
      eventCount++;
    });
  }

  console.log(`Loaded ${eventCount} events.`);
  return discordClient;
}

const conenctToDatabase = () => {
  const connection = createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database!');
  });

  return connection;
}

const connectToBancho = () => {
  const banchoConnection = new BanchoClient({
    username: config.osu.irc_username,
    password: config.osu.irc_password,
  });

  banchoConnection.connect().then(() => {
    console.log("Connected to Bancho!");
  }).catch(console.error);

  return banchoConnection;
}

const main = () => {
  console.log("Starting bot...");
  let discordClient = createDiscordClient();
  const connection = conenctToDatabase();
  const banchodiscordClient = connectToBancho();

  discordClient = loadDiscordCommands(discordClient);
  execute();
  discordClient = loadDiscordEvents(discordClient);

  discordClient.login(config.discord.token);

  return { discordClient, connection, banchodiscordClient };
}

main();
