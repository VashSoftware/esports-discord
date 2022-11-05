import { ActivityType } from "discord.js";
import { execute as _execute } from "../functions/updateMemberCountChannel.js";

export const name = 'ready';
export const once = true;
export function execute(client) {
  console.log(`Ready. Logged in as ${client.user.tag}`);

  client.user.setActivity("osu!", { type: ActivityType.Competing });

  _execute(client);
}