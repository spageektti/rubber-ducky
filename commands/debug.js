const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("debug")
    .setDescription(
      "Outputs the entire database to the console for debugging purposes.",
    ),
  async execute(interaction) {
    try {
      const { Client } = await import("replit-database");

      const db = new Client();

      const allEntries = await db.list();

      console.log("Database contents:");

      console.log("Keys retrieved:", allEntries);

      if (Array.isArray(allEntries)) {
        for (const key of allEntries) {
          console.log(`Key: ${key}`);
        }
      } else {
        console.error("Unexpected data format:", allEntries);
      }

      await interaction.reply(
        "Database contents have been logged to the console.",
      );
    } catch (error) {
      console.error("Error fetching database contents:", error);
      await interaction.reply(
        "There was an error fetching the database contents.",
      );
    }
  },
};
