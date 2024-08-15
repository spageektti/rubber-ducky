const { SlashCommandBuilder } = require("@discordjs/builders");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription(
      "Displays your profile information with additional Rubber Ducky data.",
    ),
  async execute(interaction) {
    const user = interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    const userProfile = await db.get(user.id);

    if (userProfile) {
      const profileEmbed = {
        color: 0x00ff00,
        title: `${user.username}'s Profile`,
        thumbnail: {
          url: user.displayAvatarURL({ dynamic: true }),
        },
        fields: [
          { name: "Username", value: user.tag, inline: true },
          { name: "Nickname", value: member.nickname || "None", inline: true },
          {
            name: "Joined Server",
            value: member.joinedAt.toDateString(),
            inline: true,
          },
          {
            name: "Ducky Rank",
            value: userProfile.duckyRank || "No rank yet!",
            inline: true,
          },
          {
            name: "Favorite Programming Language",
            value: userProfile.favoriteLanguage,
            inline: true,
          },
          {
            name: "Quack Points",
            value: `${userProfile.quackPoints || 0} 🦆`,
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
        "No additional data found. Use `/setprofile` to create your profile!",
      );
    }
  },
};
