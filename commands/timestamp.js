const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timestamp")
    .setDescription("Generate a Unix timestamp")
    .addStringOption((option) =>
      option
        .setName("date")
        .setDescription(
          "Specific date (ISO format) or leave empty for current time",
        ),
    ),
  async execute(interaction) {
    const dateInput = interaction.options.getString("date");
    const date = dateInput ? new Date(dateInput) : new Date();
    const timestamp = Math.floor(date.getTime() / 1000);

    await interaction.reply(`Quack! **Unix Timestamp:** ${timestamp}`);
  },
};
