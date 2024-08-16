const { SlashCommandBuilder } = require("@discordjs/builders");

function urlDecode(text) {
  return decodeURIComponent(text);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("url-decode")
    .setDescription("URL decode the provided text")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to URL decode")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const decodedText = urlDecode(text);
    await interaction.reply(`**URL Decoded Text**: ${decodedText}`);
  },
};
