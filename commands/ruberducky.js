const { SlashCommandBuilder } = require("@discordjs/builders");

function askDebugQuestions(problem) {
  const questions = [
    "Can you explain the issue step by step?",
    "What did you expect to happen?",
    "What actually happens?",
    "Have you tried isolating the problematic code?",
    "Could it be an issue with your assumptions?",
  ];
  return questions.map(q => `${q} 🦆`).join("\n");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rubberducky")
    .setDescription("Explain your problem to the Rubber Duck")
    .addStringOption(option =>
      option.setName("problem")
        .setDescription("Describe your problem")
        .setRequired(true)),
  async execute(interaction) {
    const problem = interaction.options.getString("problem");
    const questions = askDebugQuestions(problem);
    await interaction.reply(`Let's debug this together:\n${questions}`);
  },
};
