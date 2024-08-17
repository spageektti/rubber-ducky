const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("word-count")
    .setDescription("Count the number of words in the provided text")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to count words in")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const wordCount = text.trim().split(/\s+/).length;
    await interaction.reply(`**Word Count**: ${wordCount}`);
  },
};
