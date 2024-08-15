const { SlashCommandBuilder } = require("@discordjs/builders");

const memes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why do Java developers wear glasses? Because they don't see sharp!",
  "Debugging: Being the detective in a crime movie where you are also the murderer.",
  "Why was the developer unhappy at their job? They wanted arrays!",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coding-joke")
    .setDescription("Get a funny coding meme!"),
  async execute(interaction) {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    await interaction.reply(randomMeme);
  },
};
