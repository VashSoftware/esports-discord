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
	"osu_client_secret": ""
}
```

3. Run your app in development mod

```bash
npm run dev
```
