const { SlashCommandBuilder } = require("@discordjs/builders");
const getUserModel = require("../user.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("devicon-guess")
    .setDescription("Guess the technology by its icon!"),
  async execute(interaction) {
    const User = await getUserModel();
    const user = interaction.user;

    const icons = [
      {
        id: 1,
        icon: "🦊",
        answer: "Firefox",
      },
      {
        id: 2,
        icon: "🐍",
        answer: "Python",
      },
      {
        id: 3,
        icon: "☕",
        answer: "Java",
      },
      // TODO: real prepared for quiz devicons
    ];

    let userDoc = await User.findOne({ where: { id: user.id } });
    if (!userDoc) {
      userDoc = {
        id: user.id,
        username: user.username,
        points: 0,
        lastGuessedIcon: -1,
      };
    }

    const unansweredIcons = icons.filter(
      (icon) => icon.id > userDoc.lastGuessedIcon,
    );

    if (unansweredIcons.length === 0) {
      await interaction.reply(
        "You have guessed all available icons. Check back later for new ones!",
      );
      return;
    }

    const nextIcon = unansweredIcons[0];

    userDoc.lastGuessedIcon = nextIcon.id;
    await User.save(userDoc);

    const questionEmbed = {
      color: 0x00ff00,
      title: "Devicon Guessing Game!",
      description: `What technology does this icon represent? ${nextIcon.icon}`,
      footer: {
        text: "Type your answer in the chat!",
      },
    };

    await interaction.reply({ embeds: [questionEmbed] });

    const filter = (response) => {
      return response.author.id === user.id;
    };

    const collector = interaction.channel.createMessageCollector({
      filter,
      time: 30000,
    });

    collector.on("collect", async (response) => {
      const userAnswer = response.content.trim();

      if (userAnswer.toLowerCase() === nextIcon.answer.toLowerCase()) {
        userDoc.points += 1;
        await User.save(userDoc);
        await interaction.followUp("Correct! You guessed it right! 🎉");
      } else {
        await interaction.followUp(
          `Oops! The correct answer was: ${nextIcon.answer}. Better luck next time!`,
        );
      }

      collector.stop();
    });

    collector.on("end", (collected) => {
      if (collected.size === 0) {
        interaction.followUp("Time's up! No valid responses received.");
      }
    });
  },
};
