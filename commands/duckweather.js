const { SlashCommandBuilder } = require("@discordjs/builders");

function getDuckWeather() {
  const weatherConditions = [
    "Sunny with a chance of quacking!",
    "Rainy – perfect for a swim!",
    "Windy – hold onto your feathers!",
    "Snowy – time for a duck snowman!",
    "Foggy – watch out for hidden ponds!",
  ];
  return weatherConditions[
    Math.floor(Math.random() * weatherConditions.length)
  ];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("duckweather")
    .setDescription("Get a funny weather forecast from a duck's perspective"),
  async execute(interaction) {
    const weather = getDuckWeather();
    await interaction.reply(`Today's forecast: ${weather}`);
  },
};
