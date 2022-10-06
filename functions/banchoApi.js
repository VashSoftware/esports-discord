const { ircPassword } = require('../config.json');

const Banchojs = require("bancho.js");
const client = new Banchojs.BanchoClient({ username: "Stan", password: ircPassword });

client.connect().then(() => {
    console.log("We're online! Now listening for incoming messages.");
    client.on("PM", (message) => console.log(`${message.user.ircUsername}: ${message.message}`));
}).catch(console.error);