// Imports
import { Client, GatewayIntentBits, Collection } from "discord.js";
import { deployCommands } from "./utils/deployCommands";
import Banchojs from "bancho.js";
import { loadEvents } from "./events";

const banchoConnection = new Banchojs.BanchoClient({
  username: process.env.OSU_IRC_USERNAME!,
  password: process.env.OSU_IRC_KEY!,
});

await banchoConnection.connect();
console.log("Connected to Bancho!");

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
