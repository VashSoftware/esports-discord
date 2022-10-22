const 

module.exports = {
    name: "schedule",
    description: "Schedule a qualifier lobby",
    async execute(interaction) {
        
        
        await interaction.reply("lobby scheduled!");
    }
}