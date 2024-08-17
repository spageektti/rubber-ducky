const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("char-count")
    .setDescription("Count the number of characters in the provided text")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to count characters in")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const charCount = text.length;
    await interaction.reply(`**Character Count**: ${charCount}`);
  },
};
