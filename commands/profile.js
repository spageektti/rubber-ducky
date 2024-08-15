const { SlashCommandBuilder } = require("@discordjs/builders");
const getUserModel = require("../user.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription(
      "Displays your profile information.",
    ),
  async execute(interaction) {
    const User = await getUserModel();
    const user = interaction.user;

    const userDoc = await User.findOne({ where: { id: user.id } });

    if (userDoc) {
      const profileEmbed = {
        color: 0x00ff00,
        title: `${user.username}'s Profile`,
        thumbnail: {
          url: user.displayAvatarURL({ dynamic: true }),
        },
        fields: [
          { name: "Username", value: user.username, inline: true },
          {
            name: "Ducky Rank",
            value: userDoc.duckyRank || "No rank yet!",
            inline: true,
          },
          {
            name: "Favorite Programming Language",
            value: userDoc.favoriteLanguage || "Not set",
            inline: true,
          },
          {
            name: "Quack Points",
            value: `${userDoc.quackPoints || 0} 🦆`,
            inline: true,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: "Rubber Ducky Bot - Quack Quack!",
        },
      };

      interaction.reply({ embeds: [profileEmbed] });
    } else {
      interaction.reply(
        "No profile found. Use `/set-fav-language` to get started!",
      );
    }
  },
};
