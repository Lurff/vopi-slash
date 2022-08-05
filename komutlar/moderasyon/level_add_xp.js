const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const { ChannelType } = require("discord-api-types/v9")

const db = require("orio.db")

const data = {
    name:"xp-ekle",
    description:"Kullanıcıya Belirtilen Miktarda XP Eklenir (xp düşürmek için -6 gibi yazabilirsiniz)",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")
        const miktar = interaction.options.getInteger("miktar")

        const kontrol = db.fetch(`seviye_sistemi_${interaction.guild.id}`)
        if(!kontrol) return interaction.reply({embeds:[embed("","Seviye Sisteminiz Aktif Değildir","RED")]})

        db.add(`xp_${interaction.guild.id}_${user.id}`,miktar)
        return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcıya ${miktar} Xp Eklenmiştir`,"BLUPLE")]})
        

        
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addUserOption(option => 
        option.setName("kullanıcı")
        .setDescription("Seviye Eklemek İstediğiniz Kullanıcıyı Seçiniz")
        .setRequired(true)
        )
    .addIntegerOption(opt => 
        opt.setName("miktar")
        .setDescription("Kullanıcıya Verilmek İstenilen Xp Miktarını Giriniz")
        .setRequired(true)
        )
    module.exports = { data, slash_data }