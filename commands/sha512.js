const { SlashCommandBuilder } = require("@discordjs/builders");
const crypto = require("crypto");

function hashSha512(text) {
  return crypto.createHash("sha512").update(text).digest("hex");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sha512")
    .setDescription("Generate SHA-512 hash of the provided text")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Text to hash using SHA-512")
        .setRequired(true),
    ),
  async execute(interaction) {
    const inputText = interaction.options.getString("input");
    const hashedText = hashSha512(inputText);
    await interaction.reply(
      `**SHA-512 Hash of "${inputText}"**: ${hashedText}`,
    );
  },
};
