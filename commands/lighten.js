const { SlashCommandBuilder } = require("@discordjs/builders");
const tinycolor = require("tinycolor2");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lighten")
    .setDescription("Lighten a given hex color by a certain percentage")
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Hex color (e.g., #ff5733)")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("percentage")
        .setDescription("Percentage to lighten (0-100)")
        .setRequired(true),
    ),
  async execute(interaction) {
    const color = interaction.options.getString("color");
    const percentage = interaction.options.getInteger("percentage");
    const lightenedColor = tinycolor(color).lighten(percentage).toHexString();
    await interaction.reply(`Quack! **Lightened Color**: ${lightenedColor}`);
  },
};
