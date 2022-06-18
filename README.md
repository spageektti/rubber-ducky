# Discord.js Bot Guided Template

Welcome to the guided Discord.js bot template! This template has detailed instructions and comments, and supports the new Discord bot standard **slash commands**.

Use this to understand the structure of Discord bots and to build a bot of your own. (Adapted from the official [discord.js guide](https://discordjs.guide/))

[Click here for a quick-and-simple template](https://replit.com/@FaustineW1/Discordjs-Bot-Simple-Template-slash-commands).

## Setup

Here's how to get your bot up and running!

1. Go to [Discord Developer's Portal](https://discord.com/developers/applications) to [create an application and add a bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html).

2. Copy the *bot token* under the "bot" tab, and save it in [Secrets](https://docs.replit.com/programming-ide/storing-sensitive-information-environment-variables) (the padlock icon on repl.it) with the key `TOKEN`.

>**⚠️NOTE:** ALWAYS keep your token a secret!

*![Bot Token Screenshot](https://i.imgur.com/Q8Nk24W.png)*

3. Copy the *client id / application id* and save it in Secrets with the key `CLIENT_ID`.

*![Client ID Screenshot](https://i.imgur.com/1UIyOBO.png)*

4. Copy your *guild id* and save it in Secrets with the key `GUILD_ID`. *(Discord.js refers to servers as "guilds")*
> "To get guild id, open Discord and go to your settings. On the 'Advanced' page, turn on 'Developer Mode'. This will enable a 'Copy ID' button in the context menu when you right-click on a server icon, a user's profile, etc." ([Discord.js Guide](https://discordjs.guide/creating-your-bot/creating-commands.html#command-deployment-script))

*![Copy ID Screenshot](https://i.imgur.com/nBNBqYM.png)*

5. [Invite your bot](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links) to your server! (Remember to have both `bot` and `applications.commands` scopes enabled)

*![Bot Invite URL Generator Screenshot](https://i.imgur.com/Bw6Y4Pl.png)*

5. Run and enjoy! :)

## File Structure

The relevant files of this template are organized as below:

```
files/
├── index.js
├── commands/
│   ├── avatar.js
│   ├── options-info.js
│   ├── ping.js
│   ├── prune.js
│   ├── server.js
│   └── user-info.js
├── events/
│   └── ready.js
├── bot-server.js
├── deploy-commands.js
└── README.md

```
The bot is not using `README.md`. The `bot-server.js` file is optional for bot functionality (it is an option for [keeping your bot online](https://www.youtube.com/watch?v=7rU_KyudGBY)). You are **free to delete them** if you see fit.

<details>
<summary>The bot depends on all the other files to function.</summary>

`index.js` is the main file.

`deploy-commands` is used to register and update commands.

The `commands` folder contains some command examples <a href="https://github.com/discordjs/guide/tree/main/code-samples/creating-your-bot/command-handling/commands">from the discord.js github</a>.

The `events` folder contains an event example.

</details>

## Customization

Although perhaps not officially "correct," it helps me to think about Discord bots as `clients` (like fancy applications) that respond to `commands` and `events`.

To customize the bot to your liking, you customize what `commands` the bot has and what `events` it responds to. *(commands are technically a type of "interaction" that triggers "interactionCreate" events)*

Under the `commands` folder, start with `ping.js` and `server.js` for detailed comments. Other commands demonstrate some other common uses for bots.

> **⚠️NOTE:** After editing commands, remember to run `node deploy-commands.js` in the terminal to register them to Discord! You cannot use commands without registering.

#### Documentation
* [Slash Commands](https://discordjs.guide/interactions/slash-commands.html)
* [Command Handling](https://discordjs.guide/creating-your-bot/command-handling.html)
* [Event Handling](https://discordjs.guide/creating-your-bot/event-handling.html)

## Conclusion

### Additional resources

#### Javascript resources
* Read up on [Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
* Read up on [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and [Async/Await](https://www.w3schools.com/js/js_async.asp)
  * A [YouTube video](https://www.youtube.com/watch?v=vn3tm0quoqE) by [Fireship](https://www.youtube.com/c/Fireship) that really helped me
* [JavaScript documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Codecademy JavaScript tutorial](https://www.codecademy.com/learn/introduction-to-javascript)

#### Discord.js resources
* [Discord.js guide](https://discordjs.guide/)
  * [Learn Discord.js in 15 minutes](https://www.youtube.com/watch?v=H98fj3gnYbw)
* [Discord.js documentation](https://discord.js.org/#/docs/discord.js/main/general/welcome)

Documentation may be scary at first, so some helpful YouTube videos would be great for getting started!

### Good luck!

This was made as a submission to the Repl.it Template Jam. Compiling it has helped me learn so much about both javascript and Discord bots!

I'm not a professional programmer, so please keep improving on what I have. Looking forward to see what you create! :D

-- Faustine W.