const { SlashCommandBuilder } = require("@discordjs/builders");

function getMoodDuck() {
  const moods = [
    { mood: "happy", emoji: "😊🦆" },
    { mood: "sad", emoji: "😢🦆" },
    { mood: "angry", emoji: "😡🦆" },
    { mood: "excited", emoji: "😃🦆" },
    { mood: "confused", emoji: "😕🦆" },
  ];
  return moods[Math.floor(Math.random() * moods.length)];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("moodquack")
    .setDescription("Get a duck reaction based on mood"),
  async execute(interaction) {
    const { mood, emoji } = getMoodDuck();
    await interaction.reply(`Current mood: ${mood} ${emoji}`);
  },
};
