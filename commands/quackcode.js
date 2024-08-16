const { SlashCommandBuilder } = require("@discordjs/builders");

function getDuckCode() {
  const codes = [
    "Python: print('Quack World!')",
    "JavaScript: console.log('Quack World!');",
    "Java: System.out.println('Quack World!');",
    "C#: Console.WriteLine('Quack World!');",
    "Ruby: puts 'Quack World!'",
  ];
  return codes[Math.floor(Math.random() * codes.length)];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quackcode")
    .setDescription("Get a duckified code snippet"),
  async execute(interaction) {
    const code = getDuckCode();
    await interaction.reply(`Here's your duckified code snippet:\n\`${code}\``);
  },
};
