// Imports
import { Client, GatewayIntentBits, Collection } from "discord.js";
import { deployCommands } from "./utils/deployCommands";
import { loadEvents } from "./events";

const discordClient = new Client({
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

// deployCommands();

loadEvents(discordClient);

discordClient.login(process.env.DISCORD_TOKEN);
