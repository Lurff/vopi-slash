const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"uyarı-liste",
    description:"Kullanıcının Uyarılarını Görürsünüz",
    category:"general",
    execute(interaction) {

        const { guild } = interaction
        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")


        const number = db.get(`warn_n_${interaction.guild.id}_${user.id}`)
        const warn = db.get(`warn_${interaction.guild.id}_${user.id}`)
        const reason = db.get(`warn_reason_${interaction.guild.id}_${user.id}`)

        const warnList = new MessageEmbed()
        .setAuthor({name:`${user.displayName} Adlı Kullanıcının Uyarıları`,iconURL:user.displayAvatarURL({display:true})})
        .setDescription(`${warn ? warn.join(" ") : "Uyarı Bulunmamaktadır"}`)
        .setColor("BLURPLE")
        interaction.reply({embeds:[warnList]})
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addUserOption(option => 
        option.setName("kullanıcı")
        .setDescription("Uyarılarına Görmek İstediğiniz Kullancıyı Seçiniz")
        .setRequired(true)
        )
    module.exports = { data, slash_data }