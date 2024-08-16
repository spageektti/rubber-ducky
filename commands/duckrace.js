const { SlashCommandBuilder } = require("@discordjs/builders");

//TODO implement adding points to user and add real duck emojis

module.exports = {
  data: new SlashCommandBuilder()
    .setName("duckrace")
    .setDescription("Start a duck race and see who wins!"),
  async execute(interaction) {
    const ducks = ["🦆", "🦢", "🐥", "🦉"];
    const shuffledDucks = ducks.sort(() => Math.random() - 0.5);

    await interaction.reply("🚩 The duck race is starting! Choose your duck!");

    const raceMessage = await interaction.channel.send(
      `Ducks: ${shuffledDucks.join(" ")}`,
    );

    setTimeout(async () => {
      const winner =
        shuffledDucks[Math.floor(Math.random() * shuffledDucks.length)];
      await interaction.followUp(`🏁 The winner is... ${winner}!`);
    }, 5000);
  },
};
