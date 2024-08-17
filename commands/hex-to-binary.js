const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hex-to-binary")
    .setDescription("Convert a hexadecimal string to binary")
    .addStringOption((option) =>
      option
        .setName("hex")
        .setDescription("Hexadecimal string to convert")
        .setRequired(true),
    ),
  async execute(interaction) {
    const hex = interaction.options.getString("hex");
    const binary = parseInt(hex, 16).toString(2);
    await interaction.reply(`**Binary Equivalent:** ${binary}`);
  },
};
