const { SlashCommandBuilder } = require("@discordjs/builders");
const getUserModel = require("../user.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-fav-language")
    .setDescription("Set up or update your profile.")
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("Your favorite programming language")
        .setRequired(true),
    ),
  async execute(interaction) {
    const User = await getUserModel();
    const user = interaction.user;
    const favoriteLanguage = interaction.options.getString("language");

    let userDoc = await User.findOne({ where: { id: user.id } });

    if (userDoc) {
      userDoc.favoriteLanguage = favoriteLanguage;
      userDoc.duckyRank = userDoc.duckyRank || "Newbie";
      userDoc.quackPoints = userDoc.quackPoints || 0;
    } else {
      userDoc = new User({
        id: user.id,
        username: user.username,
        favoriteLanguage: favoriteLanguage,
        duckyRank: "Newbie",
        quackPoints: 0,
      });
    }

    await userDoc.save();

    interaction.reply(
      `Profile updated! Your favorite programming language is now set to ${favoriteLanguage}.`,
    );
  },
};
