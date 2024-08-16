const { SlashCommandBuilder } = require("@discordjs/builders");

function toTitleCase(text) {
  return text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(),
  );
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("titlecase")
    .setDescription("Convert the provided text to Title Case")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to convert to Title Case")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const titleCaseText = toTitleCase(text);
    await interaction.reply(`**Title Case Text**: ${titleCaseText}`);
  },
};
