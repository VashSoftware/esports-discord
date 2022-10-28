import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'production';

const dev = {
  challonge: {
    api_key: process.env.DEV_CHALLONGE_API_KEY,
    subdomain: process.env.DEV_CHALLONGE_SUBDOMAIN,
  },
  osu : {
    irc_username: process.env.DEV_OSU_IRC_USERNAME,
    irc_password: process.env.DEV_OSU_IRC_PASSWORD,
    api_v1_key: process.env.DEV_OSU_API_V1_KEY,
    api_v2_client_id: process.env.DEV_OSU_API_V2_CLIENT_ID,
    api_v2_client_secret: process.env.DEV_OSU_API_V2_CLIENT_SECRET,
  },
  discord: {
    token: process.env.DEV_DISCORD_TOKEN,
    client_id: process.env.DEV_DISCORD_CLIENT_ID,
    guild_id: process.env.DEV_DISCORD_GUILD_ID,
    count_channel_id: process.env.DEV_DISCORD_COUNT_CHANNEL_ID,
    member_count_channel_id: process.env.DEV_DISCORD_MEMBER_COUNT_CHANNEL_ID,
    staff_notify_channel_id: process.env.DEV_DISCORD_STAFF_NOTIFY_CHANNEL_ID,
    general_channel_id: process.env.DEV_DISCORD_GENERAL_CHANNEL_ID,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 27017,
    user: process.env.DEV_DB_USER || 'dev',
    password: process.env.DEV_DB_PASSWORD || 'password',
    name: process.env.DEV_DB_DATABASE || 'db'
  }
};

const production = {
  challonge: {
    api_key: process.env.CHALLONGE_API_KEY,
    subdomain: process.env.CHALLONGE_SUBDOMAIN,
  },
  osu : {
    irc_username: process.env.OSU_IRC_USERNAME,
    irc_password: process.env.OSU_IRC_PASSWORD,
    api_v1_key: process.env.OSU_API_V1_KEY,
    api_v2_client_id: process.env.OSU_API_V2_CLIENT_ID,
    api_v2_client_secret: process.env.OSU_API_V2_CLIENT_SECRET,
  },
  discord: {
    token: process.env.DISCORD_TOKEN,
    client_id: process.env.DISCORD_CLIENT_ID,
    guild_id: process.env.DISCORD_GUILD_ID,
    count_channel_id: process.env.DISCORD_COUNT_CHANNEL_ID,
    member_count_channel_id: process.env.DISCORD_MEMBER_COUNT_CHANNEL_ID,
    staff_notify_channel_id: process.env.DISCORD_STAFF_NOTIFY_CHANNEL_ID,
    general_channel_id: process.env.DISCORD_GENERAL_CHANNEL_ID,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 27017,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    name: process.env.DB_DATABASE || 'db'
  }
};

const config = {
  dev,
  production
};

export default config[env];