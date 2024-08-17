const { SlashCommandBuilder } = require("@discordjs/builders");

function formatDate(dateString, format) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  switch (format) {
    case "short":
      return date.toLocaleDateString(undefined, options);
    case "long":
      return date.toLocaleDateString(undefined, {
        ...options,
        weekday: "long",
      });
    case "iso":
      return date.toISOString();
    default:
      return "Unknown format";
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("date-format")
    .setDescription("Format a given date in different formats")
    .addStringOption((option) =>
      option
        .setName("date")
        .setDescription(
          "Date to format (ISO format or any recognizable date format)",
        )
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("format")
        .setDescription("Format to use")
        .setRequired(true)
        .addChoices(
          { name: "Short", value: "short" },
          { name: "Long", value: "long" },
          { name: "ISO", value: "iso" },
        ),
    ),
  async execute(interaction) {
    const date = interaction.options.getString("date");
    const format = interaction.options.getString("format");
    const formattedDate = formatDate(date, format);
    await interaction.reply(`**Formatted Date**: ${formattedDate}`);
  },
};
