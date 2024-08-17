const { SlashCommandBuilder } = require("@discordjs/builders");
const { v1: uuidv1 } = require("uuid");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uuid-v1")
    .setDescription(
      "Generate a UUID based on timestamp and MAC address (UUIDv1)",
    ),
  async execute(interaction) {
    const uuid = uuidv1();
    interaction.reply(`Generated UUIDv1: \`${uuid}\``);
  },
};
