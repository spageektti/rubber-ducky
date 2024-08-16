const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("javascript-check")
    .setDescription("Perform a simple code review")
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("The code to review")
        .setRequired(true),
    ),
  async execute(interaction) {
    const code = interaction.options.getString("code");

    // TODO add more complex logic
    const issues = [];
    if (code.includes("var ")) {
      issues.push(
        "Avoid using `var`. Consider using `let` or `const` instead.",
      );
    }
    if (code.includes("==")) {
      issues.push("Use `===` for strict equality checks.");
    }
    if (code.length > 200) {
      issues.push(
        "Consider breaking down large blocks of code into smaller functions.",
      );
    }

    if (issues.length > 0) {
      await interaction.reply(
        `Code Review Findings:\n- ${issues.join("\n- ")}`,
      );
    } else {
      await interaction.reply("Your code looks good! Keep up the great work!");
    }
  },
};
