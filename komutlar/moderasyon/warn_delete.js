const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"uyarı-sil",
    description:"Suncudan Belirtilen Kullanıcının Uyarıları Silinir",
    permission:"MODERATE_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { guild } = interaction
        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")

        const deleted = db.fetch(`warn_number_${interaction.guild.id}_${user.id}`)

        if(!deleted) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcının Bir Uyarısı Bulunmamaktadır`,"RED")]})

        db.delete(`warn_number_${interaction.guild.id}_${user.id}`)
        db.delete(`warn_reason_${interaction.guild.id}_${user.id}`)
        db.delete(`warn_${interaction.guild.id}_${user.id}`)
        
        interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcının Uyarıları Silindi`,"BLURPLE")]})

        const log = db.fetch(`log_${interaction.guild.id}`)
        if(!log) return;

        const Log = new MessageEmbed()
        .setTitle("Kullanıcının Uyarıları Silindi")
        .setColor("#2F3136")
        .addFields([
            {name:"Kullanıcı",value:`${user}`,inline:true},
            {name:"Yetkili",value:`${interaction.user}`,inline: true},
            {name:"Zaman",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true},
        ])
        .setFooter({text:`Kullanıcı ID: ${user.id} | Silinen Uyarı Sayısı: ${deleted}`})
        .setTimestamp(interaction.createdTimestamp)
        interaction.client.channels.cache.get(log).send({embeds:[Log]})

    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addUserOption(option => 
        option.setName("kullanıcı")
        .setDescription("Lütfen Uyarıları Silinecek Kullanıcıyı Belirtiniz")
        .setRequired(true)
        )
    module.exports = { data, slash_data }