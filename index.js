const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

//dotenv
const dotenv = require ('dotenv')
dotenv.config()

const {TOKEN, CLIENT_ID, GUILD_ID,} = process.env

// importação dos coomandos
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync( commandsPath).filter(file => file.endsWith(".js"))



const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if("data" in command && "execute" in command){
        client.commands.set(command.data.name, command)
    }else {
        console.log("Esse comando em ${filePath} esta com 'data' ou 'execute' ausentes")
    }
}

// Login bot
client.once(Events.ClientReady, readyClient => {
	console.log("Pronto! Login realizado como ${readyClient.user.tag}");
});

client.login(TOKEN);

// Listener de interações com o bot

client.on(Events.InteractionCreate, async interaction =>{
    
    if (interaction.isStringSelectMenu()){
        const selected = interaction.values [0]

        if(selected == "javascript"){
            await interaction.reply("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")

        }else if(selected == "python"){
            await interaction.reply("Documentação de Python: https://www.python.org")

        }else if(selected == "csharp") {
            await interaction.reply("Documentação de C#: https://learn.microsoft.com/en-us/dotnet/csharp/")

        }else if(selected == "discord.js") {
            await interaction.reply("Documentação de Discord.js: https://discordjs.guide/#before-you-begin")
        }

    }


    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if(!command){
        console.error(error)
        return
    }
    try{
        await command.execute(interaction)
    }
    catch (error){
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando! ")
    }
})