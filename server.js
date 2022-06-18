/*
From https://replit.com/@BeauCarnes/Encourage-Bot-JS#server.js

This file is an option to keep your discord bot online even when the tab is offline.

Two options for keeping your bot online are:

1. Upgrade your repl.it to set your project to "always on"

2. Use Uptime Robot (run keepAlive(), copy the link generated from the html window, then paste it into Uptime Robot)
*/

// Require the express library
const express = require("express");

// Create a server with express
const server = express();

// Responds to all HTTP requests
server.all("/", (req, res) => {
  res.send("Bot is running!");
})

// Keeps repl.it instance alive
function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is ready.");
  })
}

//export to be used in index.js
module.exports = keepAlive;