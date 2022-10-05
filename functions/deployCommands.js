const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("../config.json");
const { readdirSync } = require("fs");

// Get command data from all command files
const commandFiles = readdirSync("./commands").filter((x) => x.endsWith(".js"));

const commands = [];
for (const fileName of commandFiles) {
	let command = require(`../commands/${fileName}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) =>
		console.log(
			`Successfully registered ${data.length} application commands.`
		)
	)
	.catch(console.error);
