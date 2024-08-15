const { SlashCommandBuilder } = require("@discordjs/builders");

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why do Java developers wear glasses? Because they don't see sharp!",
  "Debugging: Being the detective in a crime movie where you are also the murderer.",
  "Why was the developer unhappy at their job? They wanted arrays!",
  "What do you call a programmer from Finland? Nerdic!",
  "Why did the programmer go broke? Because he lost his domain in a bet!",
  "Why did the computer go to therapy? It had too many bytes!",
  "Why did the developer get kicked out of school? Because he kept breaking the class!",
  "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings!",
  "Why did the developer go broke? Because he used up all his cache!",
  "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25!",
  "What is a programmer's favorite hangout place? Foo Bar!",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
  "Why do programmers hate nature? It has too many bugs.",
  "Why did the developer break up with his girlfriend? She had too many dependencies!",
  "Why do programmers like to code in the dark? Because they can't find the light switch!",
  "Why did the developer refuse to play hide and seek? Because good luck hiding when he can always find you with a debugger!",
  "Why do programmers prefer to use the keyboard? Because they can't find the mouse!",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coding-joke")
    .setDescription("Get a funny coding meme!"),
  async execute(interaction) {
    const randomMeme = jokes[Math.floor(Math.random() * jokes.length)];
    await interaction.reply(randomMeme);
  },
};
