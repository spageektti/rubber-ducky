const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("binary-add")
    .setDescription("Add two binary strings")
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

    const result = (parseInt(binary1, 2) + parseInt(binary2, 2)).toString(2);
    interaction.reply(`Result of binary addition: \`${result}\``);
  },
};
