import { Client, Collection, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import config from "./config.js";

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
    .filter((file) => file.endsWith(".js") || file.endsWith(".mjs"));

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
    .filter((file) => file.endsWith(".js") );
    
  let eventCount = 0;
  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    import(filePath).then((event) => {
      if (event.once) {
        discordClient.once(event.name, (...args) => event.execute(...args, discordClient));
      } else {
        discordClient.on(event.name, (...args) => event.execute(...args, discordClient));
      }
    });
    eventCount++;
  }

  console.log(`Loaded ${eventCount} events.`);
  return discordClient;
}

const main = () => {
  console.log("Starting bot...");
  let discordClient = createDiscordClient();

  discordClient = loadDiscordCommands(discordClient);
  discordClient = loadDiscordEvents(discordClient);

  discordClient.login(config.discord.token);
}

main();