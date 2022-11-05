import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Replies with server info!");

export async function execute(interaction) {
  await interaction.reply("server info!");
}