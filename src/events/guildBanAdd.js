require("dotenv").config();

module.exports = {
    name: 'guildBanAdd',
    execute(guildBan, client) {
        console.log(`${guildBan.user.username} was banned from server: ${guildBan.guild.name}`);

        const logChannel = client.channels.cache.find(channel => channel.name === "logs" && channel.guild.id === guildBan.guild.id);
        logChannel.send(`${guildBan.user.username} was banned from server: ${guildBan.guild.name}`);
    },
};