const { SlashCommandBuilder } = require("@discordjs/builders");
const crypto = require("crypto");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("decrypt-rsa")
    .setDescription("Decrypt the provided text using an RSA private key")
    .addStringOption((option) =>
      option
        .setName("encrypted-text")
        .setDescription("Encrypted text to decrypt")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("private-key")
        .setDescription("RSA private key in PEM format")
        .setRequired(true),
    ),
  async execute(interaction) {
    const encryptedText = interaction.options.getString("encrypted-text");
    const privateKey = interaction.options.getString("private-key");
    const decrypted = crypto
      .privateDecrypt(privateKey, Buffer.from(encryptedText, "base64"))
      .toString("utf8");
    await interaction.reply(`**Decrypted Text**: ${decrypted}`);
  },
};
