const { MessageEmbed } = require("discord.js");

module.exports = (client) => {

    client.on("interactionCreate",async (i) => {
        if (!i.isSelectMenu()) return;

        const { emoji } = client
        
        if(i.values[0] === "general_commands"){
            const menu = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`${emoji("users")} Genel Komutlar`)
            
            client.commands.forEach(command => {
                if(command.data.category === "general"){
                 menu.addField(`/${command.data.name}`,`${command.data.description}`)
                }
              })
            
              i.update({embeds:[menu]})
        }
        else if(i.values[0] === "staff_commands"){
            const menu = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`${emoji("staff")} Yetkili Komutları`)
            
            client.commands.forEach(command => {
                if(command.data.category === "staff"){
                 menu.addField(`/${command.data.name}`,`${command.data.description}`)
                }
              })
            
              i.update({embeds:[menu]})
        }
        else if(i.values[0] === "bot_commands"){
            const menu = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`${emoji("bot")} Bot Komutları`)
            
            client.commands.forEach(command => {
                if(command.data.category === "bot"){
                 menu.addField(`/${command.data.name}`,`${command.data.description}`)
                }
              })
            
              i.update({embeds:[menu]})
        }
        else{
            const menu = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`${emoji("music")} Müzik Komutları`)
            
            client.commands.forEach(command => {
                if(command.data.category === "music"){
                 menu.addField(`/${command.data.name}`,`${command.data.description}`)
                }
              })
            
              i.update({embeds:[menu]})
        }

    })

}
