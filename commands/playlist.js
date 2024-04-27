const { SlashCommandBuilder } = require("discord.js")

module.exports = { 
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Escute a melhor playlist"),

    async execute(interaction){
       await interaction.reply("https://open.spotify.com/playlist/37i9dQZF1DZ06evO26sni8?si=b1e9a365815d4ab8")
        }
}