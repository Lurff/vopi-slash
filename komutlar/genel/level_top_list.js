const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed, MessageAttachment} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"seviye-liste",
    description:"Sunucunuzdaki Seviyesi En Çok Olan 10 Kullanıcıyı Görüntüler",
    category:"general",
    execute(interaction) {

        const { embed } = interaction.client

        let seviye = db.all().filter(i => i.ID.startsWith(`lvl_${interaction.guild.id}`))

        let sırala = seviye.sort((a, b) => b.Data - a.Data)

        let atr = "";

        let str = "";

        sırala.slice(0, 10).forEach((i,e) => {
        i.ID = i.ID.split("_")[2]
               
        str += `**${e+1}.** <@${i.ID || " "}> » ${i.data || " "} Seviye \n` 
               
        })

        const response = new MessageEmbed()
        .setColor("BLURPLE")
        .setTitle(`${interaction.guild.name} Adlı Sunucunun Seviye Sıralaması`)
        .setDescription(str)
        .setTimestamp()
        .setFooter({text:"Vopi Bot Seviye Sistemi",iconURL:interaction.client.user.displayAvatarURL({display:true})})

        return interaction.reply({embeds:[response]})
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    module.exports = { data, slash_data }