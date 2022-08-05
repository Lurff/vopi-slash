const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { ChannelType } = require("discord-api-types/v9")

const db = require("orio.db")

const data = {
    name:"log-sıfırla",
    description:"Sunucunuzdaki Moderasyon Log Kanalınızı Sıfırlar",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const channel = interaction.options.getChannel("kanal")

        const kontrol = db.fetch(`log_${interaction.guild.id}`)

        if(kontrol){
            db.delete(`log_${interaction.guild.id}`)
            return interaction.reply({embeds:[embed("","Log Kanalınız Sıfırlanmıştır","BLURPLE")]})
        }
        else{
            return interaction.reply({embeds:[embed("","Log Kanalınız Bulunmamaktadır","RED")]})
        }

     }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    module.exports = { data, slash_data }