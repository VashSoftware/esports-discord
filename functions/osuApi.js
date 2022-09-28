const { v2, auth } = require("osu-api-extended");
const { osu_client_id, osu_client_secret } = require("../config.json");

const main = async () => {
	await auth.login(osu_client_id, osu_client_secret);

	const user = await v2.user.details(11212255, "osu");
	console.log(user);
};

module.exports = main;
