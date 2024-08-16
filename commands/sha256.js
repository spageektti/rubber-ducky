const { SlashCommandBuilder } = require("@discordjs/builders");
const crypto = require("crypto");

function hashText(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sha256")
    .setDescription("Generate SHA-256 hash of the provided text")
    .addStringOption((option) =>
      option.setName("input").setDescription("Text to hash").setRequired(true),
    ),
  async execute(interaction) {
    const inputText = interaction.options.getString("input");
    const hashedText = hashText(inputText);
    await interaction.reply(
      `**SHA-256 Hash of "${inputText}"**: ${hashedText}`,
    );
  },
};
