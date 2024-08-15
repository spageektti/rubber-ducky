const { SlashCommandBuilder } = require("@discordjs/builders");
const getUserModel = require("../user.js");

function generateMathQuestion() {
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;

  if (operator === "/") {
    num1 = num1 * num2;
  }

  const question = `${num1} ${operator} ${num2}`;
  let answer;

  switch (operator) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = num1 - num2;
      break;
    case "*":
      answer = num1 * num2;
      break;
    case "/":
      answer = num1 / num2;
      break;
  }

  return { question, answer: answer.toString() };
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("math-quiz")
    .setDescription("Test your math knowledge with a fun quiz!"),
  async execute(interaction) {
    const User = await getUserModel();
    const user = interaction.user;

    const { question, answer } = generateMathQuestion();

    let userDoc = await User.findOne({ where: { id: user.id } });
    if (!userDoc) {
      userDoc = {
        id: user.id,
        username: user.username,
        mathPoints: 0,
        lastAnsweredQuestion: -1,
      };
    }

    const questionEmbed = {
      color: 0x00ff00,
      title: "Math Quiz Time!",
      description: question,
      fields: [
        { name: "1️⃣", value: "Option A", inline: true },
        { name: "2️⃣", value: "Option B", inline: true },
        { name: "3️⃣", value: "Option C", inline: true },
      ],
      footer: {
        text: "React with the corresponding emoji to answer!",
      },
    };

    const quizMessage = await interaction.reply({
      embeds: [questionEmbed],
      fetchReply: true,
    });

    const correctOptionIndex = Math.floor(Math.random() * 3);
    const options = Array(3)
      .fill(null)
      .map((_, index) => {
        if (index === correctOptionIndex) {
          return answer;
        }
        let incorrectAnswer;
        do {
          incorrectAnswer = (Math.floor(Math.random() * 20) + 1).toString();
        } while (incorrectAnswer === answer);
        return incorrectAnswer;
      });

    questionEmbed.fields = options.map((option, index) => ({
      name: ["1️⃣", "2️⃣", "3️⃣"][index],
      value: option,
      inline: true,
    }));

    await quizMessage.edit({ embeds: [questionEmbed] });

    const filter = (reaction, reactionUser) => {
      return (
        ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name) &&
        reactionUser.id === user.id
      );
    };

    const collector = quizMessage.createReactionCollector({
      filter,
      time: 30000,
    });

    collector.on("collect", async (reaction) => {
      const selectedOptionIndex = ["1️⃣", "2️⃣", "3️⃣"].indexOf(
        reaction.emoji.name,
      );

      if (options[selectedOptionIndex] === answer) {
        userDoc.quackPoints += 1;
        await User.save(userDoc);
        await interaction.followUp("Correct! You're a math whiz! 🎉");
      } else {
        await interaction.followUp(
          `Oops! The correct answer was: ${answer}. Better luck next time!`,
        );
      }

      collector.stop();
    });

    collector.on("end", (collected) => {
      if (collected.size === 0) {
        interaction.followUp("Time's up! No valid responses received.");
      }
    });

    for (const emoji of ["1️⃣", "2️⃣", "3️⃣"]) {
      await quizMessage.react(emoji);
    }
  },
};
