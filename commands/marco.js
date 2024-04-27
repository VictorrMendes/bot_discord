const { SlashCommandBuilder } = require("discord.js")

module.exports = { 
    data: new SlashCommandBuilder()
        .setName("marco")
        .setDescription("Responde com 'Polooo!'"),

    async execute(interaction){
       await interaction.reply("Polooo!")
        }
}