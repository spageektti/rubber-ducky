const { SlashCommandBuilder } = require("@discordjs/builders");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uuid")
    .setDescription("Generate a new UUID"),
  async execute(interaction) {
    const uuid = uuidv4();
    await interaction.reply(`**Generated UUID**: ${uuid}`);
  },
};
