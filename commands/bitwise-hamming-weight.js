const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bitwise-hamming-weight")
    .setDescription(
      "Calculate the Hamming weight (number of 1s) of a binary string",
    )
    .addStringOption((option) =>
      option
        .setName("binary")
        .setDescription("Binary string to check")
        .setRequired(true),
    ),
  async execute(interaction) {
    const binary = interaction.options.getString("binary");
    const onesCount = binary.split("").filter((bit) => bit === "1").length;
    interaction.reply(`Hamming weight of the binary string: \`${onesCount}\``);
  },
};
