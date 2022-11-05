import { SlashCommandBuilder } from "discord.js";
import axios from "axios";

export const data = new SlashCommandBuilder()
  .setName("dadjoke")
  .setDescription("Sends a random dad joke");

export async function execute(interaction) {
  const options = {
    method: "GET",
    url: "https://dad-jokes.p.rapidapi.com/random/joke",
    headers: {
      "X-RapidAPI-Key": "c09b137125mshb96ea472a7c8312p13a953jsn26092b1c153e",
      "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
    },
  };

  axios.request(options)
    .then(function (response) {
      interaction.reply(
        response.data.body[0].setup + " " + response.data.body[0].punchline
      );
    })
    .catch(function (error) {
      console.error(error);
    });
}
