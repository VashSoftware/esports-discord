require("dotenv").config();

const Banchojs = require("bancho.js");
const client = new Banchojs.BanchoClient({ username: "Stan", password: process.env.OSU_IRC_PASSWORD });

client.connect().then(async () => {
    console.log("Connected to Bancho!");

    const osuChannel = client.getChannel("#osu")
    await osuChannel.join();

    await client.getUser("Sierst").sendMessage("hey dumbass");

    client.on("CM", (message) => console.log(`${message.user.ircUsername}: ${message.message}`));
}).catch(console.error);