const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const { ChannelType } = require("discord-api-types/v9")

const db = require("orio.db")

const data = {
    name:"seviye-ayar-sıfırla",
    description:"Sunucunuzdaki Seviye Sisteminizi Özelleştirirsiniz",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        db.delete(`level_log_${interaction.guild.id}`) 
        db.delete(`xp_level_${interaction.guild.id}`)
        db.delete(`xp_mesaj_${interaction.guild.id}`)
       
        return interaction.reply({embeds:[embed("",`Seviye Ayarlarınız Özelleştirilmiştir`,"BLURPLE")]})
        
        


        
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    
    module.exports = { data, slash_data }