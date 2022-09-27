const { v2, auth } = require('osu-api-extended');

const main = async () => {
    await auth.login('16151', 'nKyx4GBd0ZlcAMmzalq48AcFOklzLa7DKgQh81W4');

    const user = await v2.user.details(11212255, 'osu');
    console.log(user);
}

module.exports = main;