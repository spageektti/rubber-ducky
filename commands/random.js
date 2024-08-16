const { SlashCommandBuilder } = require("@discordjs/builders");

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Generate a random number within a specified range")
    .addIntegerOption((option) =>
      option.setName("min").setDescription("Minimum value").setRequired(true),
    )
    .addIntegerOption((option) =>
      option.setName("max").setDescription("Maximum value").setRequired(true),
    ),
  async execute(interaction) {
    const min = interaction.options.getInteger("min");
    const max = interaction.options.getInteger("max");

    if (min > max) {
      await interaction.reply(
        "The minimum value cannot be greater than the maximum value.",
      );
      return;
    }

    const randomNumber = generateRandomNumber(min, max);
    await interaction.reply(
      `**Random number between ${min} and ${max}**: ${randomNumber}`,
    );
  },
};
