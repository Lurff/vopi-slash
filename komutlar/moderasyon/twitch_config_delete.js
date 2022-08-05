const { SlashCommandBuilder } = require("@discordjs/builders")
const { ChannelType } = require("discord-api-types/v9")
const {MessageEmbed} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"twitch-sıfırla",
    description:"Canlı Yayın Açılınca Belirtilen Kanala Duyuru Mesajı Ata",
    permission:"BAN_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getString("kullanıcı")
        const channel = interaction.options.getChannel("kanal")

        const cotroller = db.fetch(`twitch_${interaction.guild.id}`)
        const cotroller2 = db.fetch(`twitch_notification_${interaction.guild.id}`)
        

        if(!cotroller && !cotroller2) return interaction.reply({embeds:[embed("","Twitch Ayarlarınız Bulunmamaktadır","RED")]})

        db.delete(`twitch_${interaction.guild.id}`)
        db.delete(`twitch_notification_${interaction.guild.id}`)
        return interaction.reply({embeds:[embed("","Twitch Ayarlarınız Sıfırlanmıştır","BLURPLE")]})

    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)

    module.exports = { data, slash_data }