const { SlashCommandBuilder } = require("@discordjs/builders");
const tinycolor = require("tinycolor2");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("grayscale")
    .setDescription("Convert a given hex color to grayscale")
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Hex color (e.g., #ff5733)")
        .setRequired(true),
    ),
  async execute(interaction) {
    const color = interaction.options.getString("color");
    const grayscaleColor = tinycolor(color).greyscale().toHexString();
    await interaction.reply(`**Grayscale Color**: ${grayscaleColor}`);
  },
};
