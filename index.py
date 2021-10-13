import discord
from discord.ext import commands
import json

with open("config.json") as config_file:
    config = json.load(config_file)
    prefix = config['prefix']
    discordToken = config['discordToken']

bot = commands.Bot(command_prefix=prefix)



bot.run(discordToken)