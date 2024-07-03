export function deployCommands() {
  const fs = require("fs");
  const path = require("path");
  const {
    REST,
    Routes,
    SlashCommandBuilder,
    ModalBuilder,
  } = require("discord.js");

  const commands = [];
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  rest
    .put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: commands }
    )
    .then((data) => console.log(`Loaded ${data.length} commands.`))
    .catch(console.error);
}
