import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import config from '../config.js';

export const name = 'deployCommands';
export const description = 'Deploy slash commands';

export function execute() {
  const commands = [];
  const commandsPath = fileURLToPath(new URL("../commands", import.meta.url));
  const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    import(filePath).then(command => {
      commands.push(command.data.toJSON());
    });
  }

  const rest = new REST({ version: '10' }).setToken(config.discord.token);

  rest.put(Routes.applicationGuildCommands(config.discord.client_id, config.discord.guild_id), { body: commands })
    .then(data => console.log(`Loaded ${data.length} commands.`))
    .catch(console.error);
}
