const { SlashCommandBuilder } = require("@discordjs/builders");

const tips = [
  "Talking to your rubber duck can help clarify your thoughts. Explain your code line by line!",
  "If you can't explain it to your rubber duck, you might not understand it yourself!",
  "When debugging, try to explain the problem to your rubber duck. It might just quack back the solution!",
  "Remember, your rubber duck is a great listener. It won't judge your coding mistakes!",
  "If you're stuck, take a break and come back to your rubber duck. Sometimes a fresh perspective helps!",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("debugging-help")
    .setDescription("Get a rubber duck debugging tip!"),
  async execute(interaction) {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    await interaction.reply(randomTip);
  },
};
