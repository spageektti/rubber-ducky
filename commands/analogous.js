const { SlashCommandBuilder } = require("@discordjs/builders");
const tinycolor = require("tinycolor2");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("analogous")
    .setDescription("Get a set of analogous colors for the provided hex color")
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Hex color (e.g., #00ff00)")
        .setRequired(true),
    ),
  async execute(interaction) {
    const color = interaction.options.getString("color");
    const analogousColors = tinycolor(color)
      .analogous()
      .map((c) => c.toHexString());
    await interaction.reply(
      `Quack! **Analogous Colors**: ${analogousColors.join(", ")}`,
    );
  },
};
