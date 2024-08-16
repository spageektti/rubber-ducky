const { SlashCommandBuilder } = require("@discordjs/builders");

function toCamelCase(text) {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase(),
    )
    .replace(/\s+/g, "");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("camelcase")
    .setDescription("Convert the provided text to camelCase")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to convert to camelCase")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const camelCaseText = toCamelCase(text);
    await interaction.reply(`**CamelCase Text**: ${camelCaseText}`);
  },
};
