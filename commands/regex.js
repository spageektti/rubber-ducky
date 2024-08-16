const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("regex")
    .setDescription("Test your regular expression against a sample text")
    .addStringOption((option) =>
      option
        .setName("regex")
        .setDescription("The regular expression")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The text to test against")
        .setRequired(true),
    ),
  async execute(interaction) {
    const regexInput = interaction.options.getString("regex");
    const text = interaction.options.getString("text");

    try {
      const regex = new RegExp(regexInput);
      const result = text.match(regex);
      if (result) {
        await interaction.reply(`Match found: ${result[0]}`);
      } else {
        await interaction.reply("No match found.");
      }
    } catch (error) {
      await interaction.reply("Invalid regular expression. Please try again.");
    }
  },
};
