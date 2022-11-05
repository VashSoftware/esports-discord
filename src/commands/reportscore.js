import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("reportscore")
  .setDescription("Reports a match score");

export async function execute(interaction) {
  await interaction.reply("score reported!");
}