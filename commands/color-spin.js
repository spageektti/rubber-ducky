const { SlashCommandBuilder } = require("@discordjs/builders");
const tinycolor = require("tinycolor2");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("color-spin")
    .setDescription("Rotate the hue of the provided hex color")
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Hex color (e.g., #ff00ff)")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("degrees")
        .setDescription("Degrees to rotate the hue (e.g., 180)")
        .setRequired(true),
    ),
  async execute(interaction) {
    const color = interaction.options.getString("color");
    const degrees = interaction.options.getInteger("degrees");
    const spunColor = tinycolor(color).spin(degrees).toHexString();
    await interaction.reply(`**Hue-Rotated Color**: ${spunColor}`);
  },
};
