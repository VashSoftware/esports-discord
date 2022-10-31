require("dotenv").config();

module.exports = {
    name: 'updateMemberCountChannel',
    execute(client, guild) {
        const memberCountChannel = client.channels.cache.find(channel => channel.name.startsWith('Member Count: ') && channel.guild.id === guild.id);
        memberCountChannel.setName(`Member Count: ${memberCountChannel.guild.memberCount}`);
    },
};