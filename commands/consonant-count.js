const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("consonant-count")
    .setDescription("Count the number of consonants in the provided text")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to count consonants in")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const consonantCount =
      text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g)?.length || 0;
    await interaction.reply(`**Consonant Count**: ${consonantCount}`);
  },
};
