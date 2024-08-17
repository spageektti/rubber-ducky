const { SlashCommandBuilder } = require("@discordjs/builders");
const tinycolor = require("tinycolor2");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("color-contrast")
    .setDescription("Calculate the contrast ratio between two hex colors")
    .addStringOption((option) =>
      option
        .setName("color1")
        .setDescription("First hex color (e.g., #ffffff)")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("color2")
        .setDescription("Second hex color (e.g., #000000)")
        .setRequired(true),
    ),
  async execute(interaction) {
    const color1 = interaction.options.getString("color1");
    const color2 = interaction.options.getString("color2");
    const contrastRatio = tinycolor.readability(color1, color2);
    await interaction.reply(`**Contrast Ratio**: ${contrastRatio}`);
  },
};
