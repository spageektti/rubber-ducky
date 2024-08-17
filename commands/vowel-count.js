const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vowel-count")
    .setDescription("Count the number of vowels in the provided text")
    .addStringOption(option =>
      option.setName("text")
        .setDescription("Text to count vowels in")
        .setRequired(true)),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const vowelCount = text.match(/[aeiouAEIOU]/g)?.length || 0;
    await interaction.reply(`**Vowel Count**: ${vowelCount}`);
  },
};
