/*
Run this file to register your commands after making changes!

To run, type `node deploy-commands.js` in the terminal
*/

// Require necessary modules, APIs, and variables
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env['TOKEN'];
const clientId = process.env['CLIENT_ID'];
const guildId = process.env['GUILD_ID'];

// Create an array of all the commands
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

// Register all the commands
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    ); //the rest API registers the commands array to Discord
    
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

/*
This registers guild commands.

To register global commands,
use Routes.applicationCommands(clientId) instead.

Note: global commands take ONE HOUR to update
*/