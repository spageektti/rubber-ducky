// Example of slash command options and reading option input
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('options-info')
		.setDescription('Information about the options provided.')
		.addStringOption(option => option.setName('input').setDescription('The input to echo back')), // user option defined
	async execute(interaction) {
		const value = interaction.options.getString('input'); // reading user option input
		if (value) return interaction.reply(`The options value is: \`${value}\``); // replying back the value of the options input
		return interaction.reply('No option was provided!');
	},
};