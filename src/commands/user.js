import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Replies with user info!");

export async function execute(interaction) {
  await interaction.reply("user info!");
}
