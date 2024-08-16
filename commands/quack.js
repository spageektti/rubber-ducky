const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quack")
    .setDescription("Quack like a duck!"),
  async execute(interaction) {
    await interaction.reply("Quack! 🦆");
  },
};
