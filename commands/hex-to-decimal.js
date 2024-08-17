const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hex-to-decimal")
    .setDescription("Convert a hexadecimal string to decimal")
    .addStringOption(option =>
      option.setName("hex")
        .setDescription("Hexadecimal string to convert")
        .setRequired(true)),
  async execute(interaction) {
    const hex = interaction.options.getString("hex");
    const decimal = parseInt(hex, 16);
    await interaction.reply(`**Decimal Equivalent:** ${decimal}`);
  },
};
