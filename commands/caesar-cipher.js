const { SlashCommandBuilder } = require("@discordjs/builders");

function caesarCipher(str, shift) {
  return str.replace(/[a-zA-Z]/g, (char) =>
    String.fromCharCode(
      (char <= "Z" ? 90 : 122) >= (char = char.charCodeAt(0) + shift)
        ? char
        : char - 26,
    ),
  );
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("caesar-cipher")
    .setDescription("Encode or decode text using Caesar Cipher")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to encode/decode with Caesar Cipher")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("shift")
        .setDescription("Shift amount for Caesar Cipher")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const shift = interaction.options.getInteger("shift");
    const cipherText = caesarCipher(text, shift);
    await interaction.reply(`**Caesar Cipher Text**: ${cipherText}`);
  },
};
