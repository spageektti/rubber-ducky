// The slash command builder is used to build the data for your commands
const { SlashCommandBuilder } = require('@discordjs/builders');

// Export the command data as a module so you can require() it in other files
module.exports = {
	data: new SlashCommandBuilder() // this is used to build a slash command
		.setName('ping') // the user would type '/ping' into the server
		.setDescription('Replies with Pong!'), // this description shows up in the list of slash commands
	async execute(interaction) { // contains the functionality of the commands
		await interaction.reply('Pong!');
	},
};

// If you need to access your client instance from inside a command file, you can access it via interaction.client.
// If you need to access external files, packages, etc., you should require() them at the top of the file.