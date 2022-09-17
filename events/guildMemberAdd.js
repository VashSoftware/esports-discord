const { logChannel } = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    execute(guildMember) {
        console.log(guildMember);
    },
};