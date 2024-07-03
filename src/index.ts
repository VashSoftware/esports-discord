// Imports
import { Client, GatewayIntentBits, Collection } from "discord.js";
import { deployCommands } from "./utils/deployCommands";
import Banchojs from "bancho.js";
import { loadEvents } from "./events";

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
};

const connectToBancho = () => {
  const banchoConnection = new Banchojs.BanchoClient({
    username: process.env.OSU_IRC_USERNAME!,
    password: process.env.OSU_IRC_KEY!,
  });

  banchoConnection
    .connect()
    .then(() => {
      console.log("Connected to Bancho!");
    })
    .catch(console.error);

  return banchoConnection;
};

const discordClient = createDiscordClient();
const banchodiscordClient = connectToBancho();

// deployCommands();

loadEvents(discordClient);

discordClient.login(process.env.DISCORD_TOKEN);
