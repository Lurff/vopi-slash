const { MessageEmbed } = require("discord.js")

module.exports = (client) => {

    const { embed } = client

    client.on("interactionCreate",interaction => {

        if(interaction.customId === "suggestion"){

            const title = interaction.components[0].components[0].value

            const userEmbed = new MessageEmbed()
            .setAuthor({name:`${interaction.user.username} Adlı Kullanıcının Önerisi`,iconURL:interaction.user.displayAvatarURL({dynamic:true})})
            .setColor("AQUA")
            .setDescription(`${title}`)
            .setFooter({text:`Önerinin Gönderilme Zamanı`})
            .setTimestamp(interaction.createdTimestamps)
            client.channels.cache.get("976602858365517874").send({embeds:[userEmbed]})

            interaction.reply({embeds:[embed("","Öneriniz Başarılı Bir Şekilde İletilmiştir","BLURPLE")],ephemeral:true})
            


        }

    })

}
