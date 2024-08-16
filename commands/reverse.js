const { SlashCommandBuilder } = require("@discordjs/builders");

function reverseText(text) {
  return text.split('').reverse().join('');
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reverse")
    .setDescription("Reverse a given text")
    .addStringOption(option =>
      option.setName("input")
        .setDescription("Text to reverse")
        .setRequired(true)),
  async execute(interaction) {
    const inputText = interaction.options.getString("input");
    const reversedText = reverseText(inputText);
    await interaction.reply(`**Reversed text**: ${reversedText}`);
  },
};
