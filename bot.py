import discord
from discord import client
from discord.ext import commands
import json
import os

with open("config.json") as config_file:
    config = json.load(config_file)
    prefix = config['prefix']
    discordToken = config['discordToken']

bot = commands.Bot(command_prefix=prefix)

for filename in os.listdir("./cogs"):
    if filename.endswith(".py"):
        bot.load_extension(f'cogs.{filename[:-3]}')
        print(f'Loaded cog: {filename}')

bot.run(discordToken)