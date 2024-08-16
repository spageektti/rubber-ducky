const { SlashCommandBuilder } = require("@discordjs/builders");

function base64Encode(text) {
  return Buffer.from(text).toString("base64");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("base64-encode")
    .setDescription("Encode the provided text to Base64")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to encode in Base64")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const encodedText = base64Encode(text);
    await interaction.reply(`**Base64 Encoded Text**: ${encodedText}`);
  },
};
