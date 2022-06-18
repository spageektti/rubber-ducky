// The slash command builder is used to build the data for your commands
const { SlashCommandBuilder } = require('@discordjs/builders');

// Export the command data as a module so you can require() it in other files
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};

// If you need to access your client instance from inside a command file, you can access it via interaction.client.
// If you need to access external files, packages, etc., you should require() them at the top of the file.