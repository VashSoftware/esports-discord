import { ActivityType } from "discord.js";

export function onReady(client) {
  client.on("ready", () => {
    console.log(`Ready. Logged in as ${client.user.tag}`);

    client.user.setActivity("osu!", { type: ActivityType.Competing });
  });
}
