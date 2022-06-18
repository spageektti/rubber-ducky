// [PREPARATION]

const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
// Access your bot info from Secrets (environment variables)
const token = process.env['TOKEN'];
// Server function (uncomment if using the bot-server.js file)
// const keepAlive = require('./bot-server'); 

// Create a new client instance
// Add more intents based on your needs
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// [EVENT HANDLER]

// Read the events files from events folder
const eventsPath = path.join(__dirname, 'events'); //path to events folder based on operating system
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

//dynamically retrieves all the events and registers them
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
  // the first and second ... are the rest parameter syntax and spread syntax, respectively
}

// [COMMAND HANDLER]
client.commands = new Collection(); // add a new commands property

// Read the command files from commands folder
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported command module
	client.commands.set(command.data.name, command);
}

// [EXECUTE COMMANDS DYNAMICALLY]

// 'interactionCreate' even listener
client.on('interactionCreate', async interaction => {
	// Not all interactions are commands, only respond if it's a command
  if (!interaction.isCommand()) return;

  // Get command module from client commands collection
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction); // execute command's function
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); // ephemeral flag - only the user who executed the command can see it
	}
});

// [FINAL STEPS]
// Keeps discord bot online (uncomment if using the bot-server.js file)
// keepAlive();

// Login to Discord with your client's token
client.login(token);