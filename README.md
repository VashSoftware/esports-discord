# discord-bot

CES Discord bot for the CES Discord server

TODO:

-   Count channel auto-moderation
-   Logs
    -   member join/leave
    -   member kick
    -   member ban/unban
    -

# Development

1. Clone the repo, install the dependencies

```bash
git clone https://github.com/Competetive-Electronic-Sports/ces-discord-bot.git
npm install
```

2. Create a `config.json` and fill the following properties

```json
{
	"token": "",
	"osu_client_id": "",
	"osu_client_secret": "",
	"clientId": "",
	"guildId": "",
	"memberCountChannelId": "",
	"logChannel": ""
}
```

3. Deploy application commands to your guildId

```bash
npm run deploy
```

4. Run your app in development mode

```bash
npm run dev
```
