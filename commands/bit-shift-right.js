const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bit-shift-right")
    .setDescription("Perform a right bitwise shift on a binary string")
    .addStringOption((option) =>
      option
        .setName("binary")
        .setDescription("Binary string to shift")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("positions")
        .setDescription("Number of positions to shift")
        .setRequired(true),
    ),
  async execute(interaction) {
    const binary = interaction.options.getString("binary");
    const positions = interaction.options.getInteger("positions");

    const result = (parseInt(binary, 2) >> positions).toString(2);
    interaction.reply(`Result of right shift: \`${result}\``);
  },
};
