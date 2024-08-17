const { SlashCommandBuilder } = require("@discordjs/builders");
const { v3: uuidv3 } = require("uuid");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uuid-v3")
    .setDescription("Generate a UUID based on namespace and name (UUIDv3)")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name to generate UUID from")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("namespace")
        .setDescription("Namespace UUID for the generation")
        .setRequired(true),
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const namespace = interaction.options.getString("namespace");
    const uuid = uuidv3(name, namespace);
    interaction.reply(`Generated UUIDv3: \`${uuid}\``);
  },
};
