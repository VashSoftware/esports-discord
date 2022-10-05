const { v2, auth } = require("osu-api-extended");
const { osuClientId, osuClientSecret } = require("../config.json");

const main = async () => {
	await auth.login(osuClientId, osuClientSecret);

	const user = await v2.user.details(11212255, "osu");
	console.log(user);
};

module.exports = main;
