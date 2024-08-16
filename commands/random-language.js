const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-language")
    .setDescription("Get a random programming language to try out"),
  async execute(interaction) {
    const languages = [
      "JavaScript",
      "Python",
      "Ruby",
      "Java",
      "C#",
      "Go",
      "Rust",
      "Swift",
      "Kotlin",
      "PHP",
    ];
    const randomLanguage =
      languages[Math.floor(Math.random() * languages.length)];
    await interaction.reply(
      `How about trying ${randomLanguage} in your next project?`,
    );
  },
};
