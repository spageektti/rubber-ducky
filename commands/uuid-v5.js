const { SlashCommandBuilder } = require("@discordjs/builders");
const { v5: uuidv5 } = require("uuid");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uuid-v5")
    .setDescription("Generate a UUID v5 based on a name and namespace")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name to generate UUID v5 for")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("namespace")
        .setDescription("Namespace (UUID) to use for generation")
        .setRequired(true),
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const namespace = interaction.options.getString("namespace");
    try {
      const uuid = uuidv5(name, namespace);
      await interaction.reply(`**Generated UUID v5**: ${uuid}`);
    } catch (error) {
      await interaction.reply("Invalid namespace UUID provided.");
    }
  },
};
