const { SlashCommandBuilder } = require("@discordjs/builders");

function rot13(str) {
  return str.replace(/[a-zA-Z]/g, (char) =>
    String.fromCharCode(
      (char <= "Z" ? 90 : 122) >= (char = char.charCodeAt(0) + 13)
        ? char
        : char - 26,
    ),
  );
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rot13")
    .setDescription("Encode or decode text using ROT13")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to encode/decode with ROT13")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const rot13Text = rot13(text);
    await interaction.reply(`**ROT13 Text**: ${rot13Text}`);
  },
};
