const { SlashCommandBuilder } = require("@discordjs/builders");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-fav-language")
    .setDescription("Set or update your Rubber Ducky profile.")
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("Your favorite programming language")
        .setRequired(true),
    ),
  async execute(interaction) {
    const user = interaction.user;
    const favoriteLanguage = interaction.options.getString("language");

    const userProfile = {
      duckyRank: null,
      favoriteLanguage: favoriteLanguage,
      quackPoints: null,
    };

    await db.set(user.id, userProfile);

    interaction.reply({
      content: "Your profile has been updated!",
      ephemeral: true,
    });
  },
};
