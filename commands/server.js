// The slash command builder is used to build the data for your commands
const { SlashCommandBuilder } = require('@discordjs/builders');

// Export the command data as a module so you can require() it in other files
module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(interaction) {
		return interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	},
};