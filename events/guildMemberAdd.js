require("dotenv").config();
const updateMemberCountChannel = require('../functions/updateMemberCountChannel');

module.exports = {
    name: 'guildMemberAdd',
    execute(guildMember, client) {
        console.log(`${guildMember.user.username} joined server: ${guildMember.guild.name}`);
        
        let logChannel = client.channels.cache.find(channel => channel.id == process.env.DISCORD_LOG_CHANNEL_ID);

        logChannel.send(
        `New member: ${guildMember}
        Username: ${guildMember.user.username}
        ID: ${guildMember.user.id}
        Account created: ${guildMember.user.createdAt}
        Joined server: ${guildMember.joinedAt}
        Member count: ${guildMember.guild.memberCount}`);

        let generalChannel = client.channels.cache.get(process.env.DISCORD_GENERAL_CHANNEL_ID);
        generalChannel.send(`${guildMember} has joined the server.`);

        updateMemberCountChannel.execute(client);
    },
};