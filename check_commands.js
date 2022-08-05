const register_commands = require("./register_commands.js")

module.exports = client => {
    client.guilds.cache.forEach(async guild => {
        const commands = await guild.commands.fetch().catch(() => { }) || client.commands.size

        if(commands.size != client.commands.size) 
        
        await register_commands(guild)
     });
}