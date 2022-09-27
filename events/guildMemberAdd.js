const { logChannel } = require('../config.json');
const updateMemberCountChannel = require('../functions/updateMemberCountChannel');

module.exports = {
    name: 'guildMemberAdd',
    execute(guildMember, client) {
        let logChannel = guildMember.guild.channels.cache.find(channel => channel.name === 'logs');

        logChannel.send(`
        New member: ${guildMember}
        Username: ${guildMember.user.username}
        ID: ${guildMember.user.id}
        Account created: ${guildMember.user.createdAt}
        Joined server: ${guildMember.joinedAt}
        Member count: ${guildMember.guild.memberCount}`);

        updateMemberCountChannel.execute(client);
    },
};