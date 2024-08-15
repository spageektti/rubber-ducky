module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Quack! 🦆 Rubber Ducky is ready to debug and have some fun! Logged in as ${client.user.tag}`);
	},
};
