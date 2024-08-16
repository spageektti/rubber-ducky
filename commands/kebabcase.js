const { SlashCommandBuilder } = require("@discordjs/builders");

function toKebabCase(text) {
  return text.replace(/\s+/g, "-").toLowerCase();
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kebabcase")
    .setDescription("Convert the provided text to kebab-case")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to convert to kebab-case")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const kebabCaseText = toKebabCase(text);
    await interaction.reply(`**Kebab-case Text**: ${kebabCaseText}`);
  },
};
