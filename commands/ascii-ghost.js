const { SlashCommandBuilder } = require("@discordjs/builders");
const figlet = require("figlet");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ascii-ghost")
    .setDescription("Generate ASCII art in the Ghost style")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to convert to ASCII art")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");

    figlet.text(text, { font: "Ghost" }, (err, data) => {
      if (err) {
        interaction.reply("Something went wrong...");
        return;
      }
      interaction.reply(`\`\`\`${data}\`\`\``);
    });
  },
};
