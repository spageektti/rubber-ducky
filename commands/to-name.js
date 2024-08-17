const { SlashCommandBuilder } = require("@discordjs/builders");
const tinycolor = require("tinycolor2");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("to-name")
    .setDescription("Convert a given hex color to its closest named color")
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Hex color (e.g., #ff5733)")
        .setRequired(true),
    ),
  async execute(interaction) {
    const color = interaction.options.getString("color");
    const name = tinycolor(color).toName();
    if (name == false) {
      await interaction.reply(`Quack! The color doesn't have a name!`);
      return;
    }
    await interaction.reply(`Quack! **Closest named color**: ${name}`);
  },
};
