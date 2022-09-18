module.exports = {
    name: 'updateMemberCountChannel',
    execute(client) {
        const memberCountChannel = client.channels.cache.get('1020846415393603604');
        memberCountChannel.setName(`Member Count: ${memberCountChannel.guild.memberCount}`);
    },
};