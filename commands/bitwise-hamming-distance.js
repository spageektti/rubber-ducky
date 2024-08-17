const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bitwise-hamming-distance")
    .setDescription("Calculate the Hamming distance between two binary strings")
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
    const binary1 = interaction.options.getString("binary1");
    const binary2 = interaction.options.getString("binary2");

    if (binary1.length !== binary2.length) {
      return interaction.reply(
        "Both binary strings must have the same length.",
      );
    }

    const distance = binary1.split("").reduce((acc, bit, index) => {
      return acc + (bit !== binary2[index] ? 1 : 0);
    }, 0);

    interaction.reply(
      `Hamming distance between the binary strings: \`${distance}\``,
    );
  },
};
