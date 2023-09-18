const fs = require("fs");
const {REST, Routes} = require("discord.js");
require('dotenv').config();
const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;


module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFodlers = fs.readdirSync("./src/commands");
        for (const folder of commandFodlers) {
            const commandFiles = fs
            .readdirSync(`./src/commands/${folder}`)
            .filter((file) => file.endsWith(".js"));

            const {commands, commandArray} = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON())
                console.log(`Command: ${command.data.name} has passed throught the handler`)
            }
        }

        const rest = new REST({version: "9"}).setToken(TOKEN);
        try{
            console.log("Started refreshing application {/} commands");
            await rest.put(Routes.applicationCommands(CLIENT_ID), { // to deply commands only for some guild use applicationGuildCommands(CLIENT_ID, GUILD_ID)
                body: client.commandArray
            });
            console.log("Sucessfully reloaded application {/} commands");
        } catch(error){
            console.error(error);
        }
    };
}