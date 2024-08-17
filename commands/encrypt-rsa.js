const { SlashCommandBuilder } = require("@discordjs/builders");
const crypto = require("crypto");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("encrypt-rsa")
    .setDescription("Encrypt the provided text using an RSA public key")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to encrypt")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("public-key")
        .setDescription("RSA public key in PEM format")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const publicKey = interaction.options.getString("public-key");
    const encrypted = crypto
      .publicEncrypt(publicKey, Buffer.from(text))
      .toString("base64");
    await interaction.reply(`**Encrypted Text**: ${encrypted}`);
  },
};
