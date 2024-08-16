const { SlashCommandBuilder } = require("@discordjs/builders");
const { validate: uuidValidate } = require("uuid");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uuid-validate")
    .setDescription("Validate if the provided string is a valid UUID")
    .addStringOption((option) =>
      option
        .setName("uuid")
        .setDescription("UUID to validate")
        .setRequired(true),
    ),
  async execute(interaction) {
    const uuid = interaction.options.getString("uuid");
    const valid = uuidValidate(uuid);
    await interaction.reply(`**UUID "${uuid}" is valid**: ${valid}`);
  },
};
