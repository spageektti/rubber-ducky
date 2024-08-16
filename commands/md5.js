const { SlashCommandBuilder } = require("@discordjs/builders");
const crypto = require("crypto");

function hashMd5(text) {
  return crypto.createHash("md5").update(text).digest("hex");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("md5")
    .setDescription("Generate MD5 hash of the provided text")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Text to hash using MD5")
        .setRequired(true),
    ),
  async execute(interaction) {
    const inputText = interaction.options.getString("input");
    const hashedText = hashMd5(inputText);
    await interaction.reply(`**MD5 Hash of "${inputText}"**: ${hashedText}`);
  },
};
