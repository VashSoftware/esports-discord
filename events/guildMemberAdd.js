const { logChannel } = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(client, guildMember) {
        console.log(guildMember);
    },
};