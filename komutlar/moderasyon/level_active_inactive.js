const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const { ChannelType } = require("discord-api-types/v9")

const db = require("orio.db")

const data = {
    name:"seviye-sistemi",
    description:"Sunucunuzdaki Seviye Sisteminizi Özelleştirirsiniz",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const manage = interaction.options.getString("aktiflik")

        const kontrol =  db.fetch(`seviye_sistemi_${interaction.guild.id}`)

        if(manage === "active"){
            if(kontrol) return interaction.reply({embeds:[embed("","Sistem Daha Önce Aktif Edilmiştir","RED")]})
            db.set(`seviye_sistemi_${interaction.guild.id}`,true)
            return interaction.reply({embeds:[embed("","Seviye Sisteminiz Aktif Edilmiştir","BLURPLE")]})
        }else{
            if(!kontrol) return interaction.reply({embeds:[embed("","Sistem Daha Önce Kapatılmıştır","RED")]})
            db.delete(`seviye_sistemi_${interaction.guild.id}`)
            return interaction.reply({embeds:[embed("","Seviye Sistemi Kapatılmıştır","BLURPLE")]})
        }

    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addStringOption(option => 
        option.setName("aktiflik")
        .setDescription("Seviye Sisteminizi Açar Veya Kapatmanızı Sağlar")
        .addChoices(
            {name:"Sistem Aktif",value:"active"},
            {name:"Sistem Pasif",value:"inactive"}
        )
        .setRequired(true)
        )
    module.exports = { data, slash_data }