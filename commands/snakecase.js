const { SlashCommandBuilder } = require("@discordjs/builders");

function toSnakeCase(text) {
  return text.replace(/\s+/g, "_").toLowerCase();
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snakecase")
    .setDescription("Convert the provided text to snake_case")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to convert to snake_case")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const snakeCaseText = toSnakeCase(text);
    await interaction.reply(`**Snake_case Text**: ${snakeCaseText}`);
  },
};
