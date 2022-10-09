require("dotenv").config();
const updateMemberCountChannel = require('../functions/updateMemberCountChannel');

module.exports = {
    name: 'guildMemberRemove',
    execute(guildMember, client) {
        console.log(`${guildMember.user.username} left server: ${guildMember.guild.name}`);
        
        let logChannel = client.channels.cache.find(channel => channel.id == process.env.DISCORD_LOG_CHANNEL_ID);

        logChannel.send(`
        Member left: ${guildMember}
        Username: ${guildMember.user.username}
        ID: ${guildMember.user.id}
        Account created: ${guildMember.user.createdAt}
        Joined server: ${guildMember.joinedAt}
        Member count: ${guildMember.guild.memberCount}`);

        updateMemberCountChannel.execute(client);
    },
};