import discord
from discord.ext import commands
import datetime

class Events(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_ready(self):
        if not hasattr(self.bot, "uptime"):
            self.bot.uptime = datetime.now()
        
        print(f'Logged in as: {self.bot.user}')

    @commands.Cog.listener()
    async def on_disconnect(self):
        print(f'Disconnected from Discord.')

    @commands.Cog.listener()
    async def on_resumed(self):
        print(f'Disconnected from Discord.')

def setup(bot):
    bot.add_cog(Events(bot))