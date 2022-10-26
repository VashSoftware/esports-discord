require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const updateMemberCountChannel = require('../functions/updateMemberCountChannel');

module.exports = {
    name: 'guildMemberAdd',
    execute(guildMember, client) {
        console.log(`${guildMember.user.username} joined server: ${guildMember.guild.name}`);
        
        // Log to log channel
        const logChannel = client.channels.cache.find(channel => channel.name === "logs" && channel.guild.id === guildMember.guild.id);

        const embed = new EmbedBuilder()
            .setTitle('Member Joined')
            .setColor(0x00FF00)
            .setThumbnail(guildMember.user.avatarURL())
            .addFields(
                { name: 'User', value: guildMember.user.username },
                { name: 'User ID', value: guildMember.user.id },
                { name: 'Joined At', value: guildMember.joinedAt.toUTCString() },
                { name: 'Account Created At', value: guildMember.user.createdAt.toUTCString() },
                { name: 'Member Count', value: guildMember.guild.memberCount.toString() }
            )
            .setTimestamp();
        logChannel.send({ embeds: [embed] });

        const generalChannel = client.channels.cache.get(process.env.DISCORD_GENERAL_CHANNEL_ID);
        generalChannel.send(`${guildMember} has joined the server.`);

        updateMemberCountChannel.execute(client);
    },
};