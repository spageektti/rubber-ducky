const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bitwise-parity")
    .setDescription("Calculate the parity (even or odd) of a binary string")
    .addStringOption((option) =>
      option
        .setName("binary")
        .setDescription("Binary string to check")
        .setRequired(true),
    ),
  async execute(interaction) {
    const binary = interaction.options.getString("binary");
    const onesCount = binary.split("").filter((bit) => bit === "1").length;
    const parity = onesCount % 2 === 0 ? "even" : "odd";
    interaction.reply(`Parity of the binary string: \`${parity}\``);
  },
};
