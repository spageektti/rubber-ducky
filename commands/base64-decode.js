const { SlashCommandBuilder } = require("@discordjs/builders");

function base64Decode(text) {
  try {
    return Buffer.from(text, "base64").toString("utf-8");
  } catch (e) {
    return "Invalid Base64 string.";
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("base64-decode")
    .setDescription("Decode the provided Base64 text")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Base64 text to decode")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const decodedText = base64Decode(text);
    await interaction.reply(`**Base64 Decoded Text**: ${decodedText}`);
  },
};
