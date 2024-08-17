const { SlashCommandBuilder } = require("@discordjs/builders");

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("binary-gcd")
    .setDescription("Calculate the GCD of two binary strings")
    .addStringOption((option) =>
      option
        .setName("binary1")
        .setDescription("First binary string")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("binary2")
        .setDescription("Second binary string")
        .setRequired(true),
    ),
  async execute(interaction) {
    const binary1 = parseInt(interaction.options.getString("binary1"), 2);
    const binary2 = parseInt(interaction.options.getString("binary2"), 2);

    const result = gcd(binary1, binary2).toString(2);
    interaction.reply(`GCD of the binary strings: \`${result}\``);
  },
};
