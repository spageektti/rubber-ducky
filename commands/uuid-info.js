const { SlashCommandBuilder } = require("@discordjs/builders");
const { validate: uuidValidate, version: uuidVersion } = require("uuid");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uuid-info")
    .setDescription("Get information about a UUID")
    .addStringOption((option) =>
      option
        .setName("uuid")
        .setDescription("UUID string to get information about")
        .setRequired(true),
    ),
  async execute(interaction) {
    const uuid = interaction.options.getString("uuid");
    const isValid = uuidValidate(uuid);
    const version = isValid ? uuidVersion(uuid) : "unknown";

    interaction.reply(`UUID: ${uuid}\nValid: ${isValid}\nVersion: ${version}`);
  },
};
