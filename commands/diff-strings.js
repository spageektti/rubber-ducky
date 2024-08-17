const { SlashCommandBuilder } = require("@discordjs/builders");
const diff = require("diff");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("diff-strings")
    .setDescription("Calculate the difference between two strings")
    .addStringOption((option) =>
      option
        .setName("string1")
        .setDescription("First string")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("string2")
        .setDescription("Second string")
        .setRequired(true),
    ),
  async execute(interaction) {
    const string1 = interaction.options.getString("string1");
    const string2 = interaction.options.getString("string2");
    const differences = diff.diffWords(string1, string2);
    const result = differences
      .map((part) =>
        part.added
          ? `+${part.value}`
          : part.removed
            ? `-${part.value}`
            : part.value,
      )
      .join("");

    interaction.reply(`Differences:\n\`\`\`\n${result}\n\`\`\``);
  },
};
