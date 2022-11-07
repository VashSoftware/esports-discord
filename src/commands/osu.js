import config from "../config.js";
import { SlashCommandBuilder } from "discord.js";
import { v2, auth } from 'osu-api-extended';

export const data = new SlashCommandBuilder()
  .setName("osu")
  .setDescription("Replies with osu! user info!")
  .addStringOption(option => option.setName("username").setDescription("osu! username"));

export async function execute(interaction) {
  await auth.login(config.osu.api_v2_client_id, config.osu.api_v2_client_secret);

  const username = interaction.options.getString("username") !== null ? interaction.options.getString("username") : interaction.user.username;

  const user = await v2.user.details(username, 'osu');

  await interaction.reply(
    `osu! user info for ${user.username}:

    **Rank:** ${user.statistics.global_rank}
    **PP:** ${user.statistics.pp}
    **Accuracy:** ${user.statistics.hit_accuracy}
    **Playcount:** ${user.statistics.play_count}
    **Level:** ${user.statistics.level.current}
    **Country Rank:** ${user.statistics.country_rank}
    **Country:** ${user.country.name}`);
}
