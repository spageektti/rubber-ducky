const { SlashCommandBuilder } = require("@discordjs/builders");

function toConstantCase(text) {
  return text.replace(/\s+/g, "_").toUpperCase();
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("constantcase")
    .setDescription("Convert the provided text to CONSTANT_CASE")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to convert to CONSTANT_CASE")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const constantCaseText = toConstantCase(text);
    await interaction.reply(`**CONSTANT_CASE Text**: ${constantCaseText}`);
  },
};
