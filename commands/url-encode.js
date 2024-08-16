const { SlashCommandBuilder } = require("@discordjs/builders");

function urlEncode(text) {
  return encodeURIComponent(text);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("url-encode")
    .setDescription("URL encode the provided text")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to URL encode")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const encodedText = urlEncode(text);
    await interaction.reply(`**URL Encoded Text**: ${encodedText}`);
  },
};
