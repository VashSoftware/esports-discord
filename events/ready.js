const { ActivityType } = require("discord.js");
const updateMemberCountChannel = require("../functions/updateMemberCountChannel");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready. Logged in as ${client.user.tag}`);

        client.user.setActivity("osu!", { type: ActivityType.Competing });

        updateMemberCountChannel.execute(client);
    },
};