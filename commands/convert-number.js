const { SlashCommandBuilder } = require("@discordjs/builders");

function decimalToBinary(decimal) {
  return parseInt(decimal, 10).toString(2);
}

function decimalToOctal(decimal) {
  return parseInt(decimal, 10).toString(8);
}

function decimalToHexadecimal(decimal) {
  return parseInt(decimal, 10).toString(16).toUpperCase();
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("convert-number")
    .setDescription(
      "Convert a decimal number to binary, octal, and hexadecimal systems",
    )
    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription("Decimal number to convert")
        .setRequired(true),
    ),
  async execute(interaction) {
    const decimalNumber = interaction.options.getInteger("number");

    const binary = decimalToBinary(decimalNumber);
    const octal = decimalToOctal(decimalNumber);
    const hexadecimal = decimalToHexadecimal(decimalNumber);

    await interaction.reply(`**Decimal number**: ${decimalNumber}
    - **Binary**: ${binary}
    - **Octal**: ${octal}
    - **Hexadecimal**: ${hexadecimal}`);
  },
};
