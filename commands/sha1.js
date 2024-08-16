const { SlashCommandBuilder } = require("@discordjs/builders");
const crypto = require('crypto');

function hashSha1(text) {
  return crypto.createHash('sha1').update(text).digest('hex');
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sha1")
    .setDescription("Generate SHA-1 hash of the provided text")
    .addStringOption(option =>
      option.setName("input")
        .setDescription("Text to hash using SHA-1")
        .setRequired(true)),
  async execute(interaction) {
    const inputText = interaction.options.getString("input");
    const hashedText = hashSha1(inputText);
    await interaction.reply(`**SHA-1 Hash of "${inputText}"**: ${hashedText}`);
  },
};
