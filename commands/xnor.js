const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xnor")
    .setDescription("Perform XNOR operation on two binary strings")
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

    const result = binary1
      .split("")
      .map((bit, index) => {
        return bit === binary2[index] ? "1" : "0";
      })
      .join("");

    interaction.reply(`Result of XNOR: \`${result}\``);
  },
};
