const { SlashCommandBuilder } = require("@discordjs/builders");

function generatePassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generate-password")
    .setDescription("Generate a random secure password")
    .addIntegerOption((option) =>
      option
        .setName("length")
        .setDescription("Length of the password")
        .setRequired(true),
    ),
  async execute(interaction) {
    const length = interaction.options.getInteger("length");
    const password = generatePassword(length);
    await interaction.reply(
      `Quack! **Generated Password**: \`${password}\`. You know it's not secure, right?`,
    );
  },
};
