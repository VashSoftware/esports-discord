require("dotenv").config();

module.exports = {
    name: 'guildBanAdd',
    execute(guildBan, client) {
        console.log(`${guildBan.user.username} was banned from server: ${guildBan.guild.name}`);

        const logChannel = client.channels.cache.get(process.env.DISCORD_LOG_CHANNEL_ID);
        logChannel.send(`${guildBan.user.username} was banned from server: ${guildBan.guild.name}`);
    },
};