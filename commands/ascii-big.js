const { SlashCommandBuilder } = require("@discordjs/builders");
const figlet = require("figlet");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ascii-big")
    .setDescription("Generate ASCII art in the Big style")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Text to convert to ASCII art")
        .setRequired(true),
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");

    figlet.text(text, { font: "Big" }, (err, data) => {
      if (err) {
        interaction.reply("Something went wrong...");
        return;
      }
      interaction.reply(`\`\`\`${data}\`\`\``);
    });
  },
};
