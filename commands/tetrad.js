const { SlashCommandBuilder } = require("@discordjs/builders");
const tinycolor = require("tinycolor2");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tetrad")
    .setDescription("Get a tetrad of colors for the provided hex color")
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Hex color (e.g., #88ff00)")
        .setRequired(true),
    ),
  async execute(interaction) {
    const color = interaction.options.getString("color");
    const tetradColors = tinycolor(color)
      .tetrad()
      .map((c) => c.toHexString());
    await interaction.reply(`Quack! **Tetrad Colors**: ${tetradColors.join(", ")}`);
  },
};
