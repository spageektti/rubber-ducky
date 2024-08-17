const { SlashCommandBuilder } = require("@discordjs/builders");
const tinycolor = require("tinycolor2");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("triad")
    .setDescription("Get a triad of colors for the provided hex color")
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Hex color (e.g., #ff8800)")
        .setRequired(true),
    ),
  async execute(interaction) {
    const color = interaction.options.getString("color");
    const triadColors = tinycolor(color)
      .triad()
      .map((c) => c.toHexString());
    await interaction.reply(`**Triad Colors**: ${triadColors.join(", ")}`);
  },
};
