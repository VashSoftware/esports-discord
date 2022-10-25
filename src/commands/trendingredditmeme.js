const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trendingredditmeme")
    .setDescription("Sends the currently trending meme from reddit"),
  async execute(interaction) {
    const axios = require("axios");

    const options = {
      method: 'GET',
      url: 'https://reddit-meme.p.rapidapi.com/memes/trending',
      headers: {
        'X-RapidAPI-Key': 'c09b137125mshb96ea472a7c8312p13a953jsn26092b1c153e',
        'X-RapidAPI-Host': 'reddit-meme.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
        interaction.reply(response.data[0].url);
    }).catch(function (error) {
        console.error(error);
    });
  },
};
