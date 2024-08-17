const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bitwise-majority")
    .setDescription("Calculate the majority bit for three binary strings")
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
    )
    .addStringOption((option) =>
      option
        .setName("binary3")
        .setDescription("Third binary string")
        .setRequired(true),
    ),
  async execute(interaction) {
    const binary1 = interaction.options.getString("binary1");
    const binary2 = interaction.options.getString("binary2");
    const binary3 = interaction.options.getString("binary3");

    if (
      binary1.length !== binary2.length ||
      binary1.length !== binary3.length
    ) {
      return interaction.reply("All binary strings must have the same length.");
    }

    const majorityBits = binary1
      .split("")
      .map((bit1, index) => {
        const bit2 = binary2[index];
        const bit3 = binary3[index];

        const onesCount = [bit1, bit2, bit3].filter(
          (bit) => bit === "1",
        ).length;
        return onesCount >= 2 ? "1" : "0";
      })
      .join("");

    interaction.reply(`Majority bit string: \`${majorityBits}\``);
  },
};
