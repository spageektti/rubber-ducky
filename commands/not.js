const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("not")
    .setDescription("Perform NOT operation on a binary string")
    .addStringOption((option) =>
      option
        .setName("binary")
        .setDescription("Binary string to invert")
        .setRequired(true),
    ),
  async execute(interaction) {
    const binary = interaction.options.getString("binary");

    const result = binary
      .split("")
      .map((bit) => {
        return bit === "1" ? "0" : "1";
      })
      .join("");

    interaction.reply(`Result of NOT: \`${result}\``);
  },
};
