const { SlashCommandBuilder } = require("@discordjs/builders");
const tinycolor = require("tinycolor2");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("complement")
    .setDescription("Get the complement of a given hex color")
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Hex color (e.g., #ff5733)")
        .setRequired(true),
    ),
  async execute(interaction) {
    const color = interaction.options.getString("color");
    const complement = tinycolor(color).complement().toHexString();
    await interaction.reply(`**Complementary Color**: ${complement}`);
  },
};
