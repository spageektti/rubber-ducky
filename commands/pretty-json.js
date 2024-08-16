const { SlashCommandBuilder } = require("@discordjs/builders");

function prettyPrintJson(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    return JSON.stringify(jsonObj, null, 2);
  } catch (error) {
    return "Invalid JSON string.";
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pretty-json")
    .setDescription("Prettify a JSON string")
    .addStringOption((option) =>
      option
        .setName("json")
        .setDescription("JSON string to format")
        .setRequired(true),
    ),
  async execute(interaction) {
    const jsonString = interaction.options.getString("json");
    const prettyJson = prettyPrintJson(jsonString);
    await interaction.reply(
      `**Prettified JSON**:\n\`\`\`json\n${prettyJson}\n\`\`\``,
    );
  },
};
