require("dotenv").config();

module.exports = {
    name: 'updateMemberCountChannel',
    execute(client) {
        const memberCountChannel = client.channels.cache.get(process.env.DISCORD_MEMBER_COUNT_CHANNEL_ID);
        memberCountChannel.setName(`Member Count: ${memberCountChannel.guild.memberCount}`);
    },
};