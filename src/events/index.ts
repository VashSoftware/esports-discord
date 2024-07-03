import type { Client } from "discord.js";
import { onGuildBanAdd } from "./guildBanAdd";
import { onGuildBanRemove } from "./guildBanRemove";
import { onGuildMemberAdd } from "./guildMemberAdd";
import { onGuildMemberRemove } from "./guildMemberRemove";
import { onInteractionCreate } from "./interactionCreate";
import { onMessageCreate } from "./messageCreate";
import { onMessageDelete } from "./messageDelete";
import { onPresenceUpdate } from "./presenceUpdate";
import { onReady } from "./ready";
import { onVoiceStateUpdate } from "./voiceStateUpdate";

export function loadEvents(client: Client) {
  onGuildBanAdd(client);
  onGuildBanRemove(client);
  onGuildMemberAdd(client);
  onGuildMemberRemove(client);
  onInteractionCreate(client);
  onMessageCreate(client);
  onMessageDelete(client);
  onPresenceUpdate(client);
  onReady(client);
  onVoiceStateUpdate(client);
}
