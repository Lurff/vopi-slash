const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { ChannelType } = require("discord-api-types/v9")

const db = require("orio.db")

const data = {
    name:"log",
    description:"Sunucunuzdaki Moderasyon İşlemlerinin Kayıtını Tutacak Kanalı Ayarlayınız",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const channel = interaction.options.getChannel("kanal")

        const kontrol = db.fetch(`log_${interaction.guild.id}`)

        if(channel.id === kontrol) return interaction.reply({embeds:[embed("",`${channel} Adlı Kanal Daha Önce Kayıt Edilmiştir`,"RED")]})
    
        db.set(`log_${interaction.guild.id}`,channel.id)
        return interaction.reply({embeds:[embed("",`${channel} Adlı Kanal Başarılı Bir Şekilde Log Kanalı Olarak Ayarlanmıştır`,"BLURPLE")]})
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addChannelOption(option => 
        option.setName("kanal")
        .setDescription("Log Kanalını Ayarlarsınız")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
        )
    module.exports = { data, slash_data }