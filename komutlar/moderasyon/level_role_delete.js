const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"seviye-rol-sıfırla",
    description:"Kaçıncı Seviyede Hangi Rolü Ekleyeceğinizi Belirler",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const kontrol = db.fetch(`seviye_sistemi_${interaction.guild.id}`)
        if(!kontrol) return interaction.reply({embeds:[embed("","Seviye Sisteminiz Aktif Değildir","RED")]})

        if(!db.get(`seviye-rol_${interaction.guild.id}`)) return interaction.reply({embeds:[embed("","Seviye Rol Ayarlarınız Bulunmamaktadır","RED")]})
        db.delete(`seviye-rol_${interaction.guild.id}`)
        return interaction.reply({embeds:[embed("",`Seviye Rol Ayarlarınız Sıfırlanmıştır`,"BLURPLE")]})


        
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    module.exports = { data, slash_data }