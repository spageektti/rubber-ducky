const { SlashCommandBuilder } = require("@discordjs/builders");
const crypto = require("crypto");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hmac-sha256")
    .setDescription(
      "Generate an HMAC-SHA256 hash of the provided text with a key",
    )
    .addStringOption((option) =>
      option.setName("text").setDescription("Text to hash").setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("key")
        .setDescription("Key for HMAC-SHA256")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const key = interaction.options.getString("key");
    const hmac = crypto.createHmac("sha256", key).update(text).digest("hex");
    await interaction.reply(`**HMAC-SHA256 Hash**: ${hmac}`);
  },
};
