const { SlashCommandBuilder } = require("@discordjs/builders");
const crypto = require("crypto");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-rsa-keypair")
    .setDescription("Generate an RSA key pair (public and private keys)"),
  async execute(interaction) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
    });
    await interaction.reply(
      `**Public Key**:\n\`\`\`${publicKey.export({ type: "spki", format: "pem" })}\`\`\`\n**Private Key**:\n\`\`\`${privateKey.export({ type: "pkcs8", format: "pem" })}\`\`\``,
    );
  },
};
