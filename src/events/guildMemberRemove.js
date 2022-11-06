import { execute as _execute } from '../functions/updateMemberCountChannel.js';

export const name = 'guildMemberRemove';
export function execute(guildMember, client) {
  console.log(`${guildMember.user.username} left server: ${guildMember.guild.name}`);
  _execute(client, guildMember.guild);
}
