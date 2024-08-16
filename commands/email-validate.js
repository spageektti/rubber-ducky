const { SlashCommandBuilder } = require("@discordjs/builders");

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("email-validate")
    .setDescription("Validate if the provided string is a valid email address")
    .addStringOption((option) =>
      option
        .setName("email")
        .setDescription("Email to validate")
        .setRequired(true),
    ),
  async execute(interaction) {
    const email = interaction.options.getString("email");
    const valid = isValidEmail(email);
    await interaction.reply(`**Email "${email}" is valid**: ${valid}`);
  },
};
