const { SlashCommandBuilder } = require("@discordjs/builders");

function generateBugMessage() {
  const lines = Math.floor(Math.random() * 100) + 1;
  const bugs = [
    "undefined variable",
    "unexpected token",
    "null reference exception",
    "out of bounds error",
    "Object reference not set to an instance of an object",
  ];
  const bug = bugs[Math.floor(Math.random() * bugs.length)];
  return `You've got a ${bug} in line ${lines}. 🐛`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bugquack")
    .setDescription("Get a random bug message"),
  async execute(interaction) {
    const bugMessage = generateBugMessage();
    await interaction.reply(bugMessage);
  },
};
