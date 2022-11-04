import config from "../config.mjs";
import { BanchoClient } from "bancho.js";
const client = new BanchoClient({ username: "Stan", password: config.osu.irc_password });

client.connect().then(async () => {
    console.log("Connected to Bancho!");

    const osuChannel = client.getChannel("#osu")
    await osuChannel.join();

    await client.getUser("Sierst").sendMessage("hey dumbass");

    client.on("CM", (message) => console.log(`${message.user.ircUsername}: ${message.message}`));
}).catch(console.error);