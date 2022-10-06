const { v2, auth } = require('osu-api-extended');

module.exports = {
    hello: 'world',
    async execute() {
        await auth.login(osu_client_id, osu_client_secret);

        const user = await v2.user.details(11212255, 'osu');
        console.log(user);
    }
}