const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed, MessageAttachment} = require("discord.js")
const canvacord = require("canvacord");

const db = require("orio.db")

const data = {
    name:"seviye",
    description:"Üye Seçilirse Üyenin Seviyesini Seçilmezse Kendi Seviyeniz Görüntülenir",
    category:"general",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction?.options.getMember("kullanıcı")

        let xp = db.fetch(`xp_${interaction.guild.id}_${interaction.user.id}`)
        let lvl = db.fetch(`lvl_${interaction.guild.id}_${interaction.user.id}`)
        let teyit = db.fetch(`seviye_sistemi_${interaction.guild.id}`)
        let xplevel = db.fetch(`xp_level_${interaction.guild.id}`)

        if(!teyit) return interaction.reply({embeds:[embed("","Seviye Sistemi Sunucuda Aktif Değildir","RED")]})
        if(!user){      
        const rank = new canvacord.Rank()
        .setAvatar(interaction.user.displayAvatarURL({format : "png"}))
        .setCurrentXP(xp || 0)
        .setRequiredXP(xplevel)
        .setLevel(lvl || 0,"Seviye",true)
        .setRank(xp || 0,"XP",true)
        .setStatus(interaction.member.presence?.status || "online")
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(interaction.user.username)
        .setDiscriminator(interaction.user.discriminator)
        rank.build()
        .then(data => {
        const attachment = new MessageAttachment(data, "RankCard.png");
       interaction.reply({files:[attachment]});
        });
        }else{
            let kuxp = db.fetch(`xp_${interaction.guild.id}_${user.id}`)
            let kulvl = db.fetch(`lvl_${interaction.guild.id}_${user.id}`)

            const rank = new canvacord.Rank()
            .setAvatar(interaction.user.displayAvatarURL({format : "png"}))
            .setCurrentXP(kuxp || 0)
            .setRequiredXP(xplevel)
            .setLevel(kulvl || 0,"Seviye",true)
            .setRank(xp || 0,"XP",true)
            .setStatus(interaction.user.presence?.status || "online")
            .setProgressBar("#FFFFFF", "COLOR")
            .setUsername(interaction.user.username)
            .setDiscriminator(interaction.user.discriminator)
            rank.build()
           .then(data => {
                const attachment = new MessageAttachment(data, "RankCard.png");
                interaction.reply({files:[attachment]});
            });
        }
        
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addUserOption(opt => 
        opt.setName("kullanıcı")
        .setDescription("Seviyesini Görmek İstediğiniz Kullanıcıyı Etiketleyiniz")
        )
    module.exports = { data, slash_data }