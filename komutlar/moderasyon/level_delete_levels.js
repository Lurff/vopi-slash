const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const { ChannelType } = require("discord-api-types/v9")

const db = require("orio.db")

const data = {
    name:"seviye-sıfırla",
    description:"Eğer Kullanıcı Seçilirse Kullanıcının Seviyesi Sıfırlanır Seçilmezse Suncudaki Seviyeleri Sıfırlar",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction?.options.getMember("kullanıcı")

        const kontrol = db.fetch(`seviye_sistemi_${interaction.guild.id}`)
        if(!kontrol) return interaction.reply({embeds:[embed("","Seviye Sisteminiz Aktif Değildir","RED")]})

        if(user){

            const kontrol1 = db.fetch(`xp_${interaction.guild.id}_${user.id}`)
            const kontrol2 = db.fetch(`lvl_${interaction.guild.id}_${user.id}`)

            if(kontrol1 || kontrol2){
                db.delete(`xp_${interaction.guild.id}_${user.id}`)
                db.delete(`lvl_${interaction.guild.id}_${user.id}`)
                return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcının Seviyeleri Sıfırlanmıştır`,"BLURPLE")]})
            }else{
                return interaction.reply({embeds:[embed("","Kullanıcının Seviye Verileri Bulunmamaktadır","RED")]})
            }
        
        }else{
            db.all().filter(i => {
                if(i.ID.startsWith(`lvl_${interaction.guild.id}`)) db.delete(i.ID)
                if(i.ID.startsWith(`xp_${interaction.guild.id}`)) db.delete(i.ID)
            })
            return interaction.reply({embeds:[embed("","Sunucudaki Seviye Verileri Sıfırlanmıştır","BLURPLE")]})
        }
        
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addUserOption(option => 
        option.setName("kullanıcı")
        .setDescription("Seviye Eklemek İstediğiniz Kullanıcıyı Seçiniz")
        )
    module.exports = { data, slash_data }