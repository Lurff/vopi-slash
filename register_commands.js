const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")

module.exports = async guild => {

    const { client } = guild

    const rest = new REST({version:"9"}).setToken(process.env.token)

    const body = client.commands.map(command => command.slash_data)


    try{

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body }
        )

    }catch(e){
        console.log(e)
    }
  

}