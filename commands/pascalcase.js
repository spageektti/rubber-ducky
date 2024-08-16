const { SlashCommandBuilder } = require("@discordjs/builders");

function toPascalCase(text) {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => match.toUpperCase())
    .replace(/\s+/g, "");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pascalcase")
    .setDescription("Convert the provided text to PascalCase")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to convert to PascalCase")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const pascalCaseText = toPascalCase(text);
    await interaction.reply(`**PascalCase Text**: ${pascalCaseText}`);
  },
};
