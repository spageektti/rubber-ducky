const { SlashCommandBuilder } = require("@discordjs/builders");

const compliments = [
  "Your code is so clean, it could be a soap commercial!",
  "You're a coding wizard! Even Harry Potter would be jealous!",
  "Your debugging skills are top-notch! You could teach a rubber duck a thing or two!",
  "You write code like a poet writes verses!",
  "Your logic is so sound, it could be a symphony!",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("code-compliment")
    .setDescription("Get a coding compliment!"),
  async execute(interaction) {
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    await interaction.reply(randomCompliment);
  },
};
