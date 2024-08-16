const { SlashCommandBuilder } = require("@discordjs/builders");

function duckifyText(text) {
  return text
    .split(" ")
    .map((word) => `quack${word}quack`)
    .join(" ");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("duckify")
    .setDescription("Translate your text to duck language")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to duckify")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const duckified = duckifyText(text);
    await interaction.reply(duckified);
  },
};
