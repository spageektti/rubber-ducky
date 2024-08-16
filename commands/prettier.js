const { SlashCommandBuilder } = require("@discordjs/builders");
const prettier = require("prettier");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prettier")
    .setDescription("Format your code to make it more readable")
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("The code to format")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("Select the programming language")
        .setRequired(true)
        .addChoices(
          { name: "JavaScript", value: "babel" },
          { name: "TypeScript", value: "typescript" },
          { name: "HTML", value: "html" },
          { name: "CSS", value: "css" },
          { name: "JSON", value: "json" },
          { name: "Markdown", value: "markdown" },
          { name: "YAML", value: "yaml" },
        ),
    ),
  async execute(interaction) {
    const code = interaction.options.getString("code");
    const language = interaction.options.getString("language");

    let formattedCode;
    try {
      formattedCode = prettier.format(code, { parser: language });
    } catch (error) {
      return interaction.reply(
        "Sorry, I couldn't format the code. Please check the syntax and try again.",
      );
    }

    await interaction.reply(`\`\`\`${language}\n${formattedCode}\n\`\`\``);
  },
};
