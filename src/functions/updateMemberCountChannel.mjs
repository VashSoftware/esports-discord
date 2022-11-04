import config from "../config.mjs";

export const name = 'updateMemberCountChannel';
export function execute(client) {
    const memberCountChannel = client.channels.cache.get(config.discord.member_count_channel_id);
    memberCountChannel.setName(`Member Count: ${memberCountChannel.guild.memberCount}`);
}