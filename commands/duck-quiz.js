const { SlashCommandBuilder } = require("@discordjs/builders");
const getUserModel = require("../user.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("duck-quiz")
    .setDescription(
      "Test your programming knowledge with a ducky-themed quiz!",
    ),
  async execute(interaction) {
    const User = await getUserModel();
    const user = interaction.user;

    const questions = [
      {
        id: "1",
        question: "What does a duck say when it’s coding in Python?",
        options: ["Quack()", 'print("Quack")', "duck.say()"],
        answer: 'print("Quack")',
        emojis: ["1️⃣", "2️⃣", "3️⃣"],
      },
      {
        id: "2",
        question: "What’s a duck’s favorite programming language?",
        options: ["JavaScript", "C#", "QuackScript"],
        answer: "QuackScript",
        emojis: ["1️⃣", "2️⃣", "3️⃣"],
      },
      {
        id: "3",
        question: "How does a duck debug its code?",
        options: [
          "By quacking at it",
          "With a debugger",
          "By reading the logs",
        ],
        answer: "By quacking at it",
        emojis: ["1️⃣", "2️⃣", "3️⃣"],
      },
    ];

    let userDoc = await User.findOne({ where: { id: user.id } });
    if (!userDoc) {
      userDoc = new User({
        id: user.id,
        username: user.username,
        quackPoints: 0,
      });
    }

    const lastAnsweredQuestionId = userDoc.lastAnsweredQuestion;
    const nextQuestion = questions.find((q) => q.id !== lastAnsweredQuestionId);

    if (!nextQuestion) {
      await interaction.reply(
        "You have answered all available questions. Check back later for new ones!",
      );
      return;
    }

    userDoc.lastAnsweredQuestion = nextQuestion.id;
    await userDoc.save();

    const questionEmbed = {
      color: 0xffff00,
      title: "Ducky Quiz Time!",
      description: nextQuestion.question,
      fields: nextQuestion.options.map((option, index) => ({
        name: nextQuestion.emojis[index],
        value: option,
        inline: true,
      })),
      footer: {
        text: "React with the corresponding emoji to answer!",
      },
    };

    const quizMessage = await interaction.reply({
      embeds: [questionEmbed],
      fetchReply: true,
    });

    for (const emoji of nextQuestion.emojis) {
      await quizMessage.react(emoji);
    }

    const filter = (reaction, reactionUser) => {
      console.log(
        `Reaction received: ${reaction.emoji.name} by ${reactionUser.username}`,
      );
      return (
        nextQuestion.emojis.includes(reaction.emoji.name) &&
        reactionUser.id === user.id
      );
    };

    const collector = quizMessage.createReactionCollector({
      filter,
      time: 30000,
    });

    collector.on("collect", async (reaction) => {
      console.log(`Collected reaction: ${reaction.emoji.name}`);

      const selectedOptionIndex = nextQuestion.emojis.indexOf(
        reaction.emoji.name,
      );
      const correctAnswerIndex = nextQuestion.options.indexOf(
        nextQuestion.answer,
      );

      if (selectedOptionIndex === correctAnswerIndex) {
        userDoc.quackPoints += 1;
        await userDoc.save();
        await interaction.followUp(
          "Correct! You know your quacks from your quacks! 🦆",
        );
      } else {
        await interaction.followUp(
          `Oops! The correct answer was: ${nextQuestion.answer}. Better luck next time!`,
        );
      }

      collector.stop();
    });

    collector.on("end", (collected) => {
      console.log(`Collector ended. Collected ${collected.size} reactions.`);
      if (collected.size === 0) {
        interaction.followUp("Time's up! No valid responses received.");
      }
    });
  },
};
