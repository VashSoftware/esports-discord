const { memberCountChannelId } = require('../config.json');

module.exports = {
    name: 'updateMemberCountChannel',
    execute(client) {
        const memberCountChannel = client.channels.cache.get(memberCountChannelId);
        memberCountChannel.setName(`Member Count: ${memberCountChannel.guild.memberCount}`);
    },
};