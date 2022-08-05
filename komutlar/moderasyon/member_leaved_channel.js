const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { ChannelType } = require("discord-api-types/v9")

const db = require("orio.db")

const data = {
    name:"ayrılma-kanal",
    description:"Sunucudan Ayrılan Kullanıcıların Belirlenen Kanala Resimli Ayrılma Mesajı Göndermesini Sağlar",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const channel = interaction?.options.getChannel("kanal")
        const deleted = interaction?.options.getString("sıfırla")

        const kontrol = db.fetch(`member_leaved_channel_${interaction.guild.id}`)

        if(channel && deleted){
            return interaction.reply({embeds:[embed("","Ayarları Teker Teker Yapınız","RED")]})
        }
        else if(channel){
            if(channel.id === kontrol) return interaction.reply({embeds:[embed("",`${channel} Adlı Kanal Daha Önce Kayıt Edilmiştir`,"RED")]})
    
            db.set(`member_leaved_channel_${interaction.guild.id}`,channel.id)
            interaction.reply({embeds:[embed("",`${channel} Adlı Kanal Başarılı Bir Şekilde Ayrılma Mesaj Kanalı Olarak Ayarlanmıştır`,"BLURPLE")]})

            const log = db.fetch(`log_${interaction.guild.id}`)
            if(!log) return;

            const Log = new MessageEmbed()
            .setTitle("Ayrılma Mesaj Kanalı Ayarlanmıştır")
            .setColor("#2F3136")
            .addFields([
                {name:"Ayarlanan Kanal",value:`${channel}`,inline:true},
                {name:"Ayarlayan Yetkili",value:`${interaction.user}`,inline:true},
                {name:"Ayarlanan Zaman",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true}
            ])
            .setImage("https://cdn.glitch.global/162de739-8a55-4de4-945b-f3227f87f50c/walpaper.png?v=1651527266617")
            .setFooter({text:`Ayarlanan Kanal ID: ${channel.id}`})
            .setTimestamp(interaction.createdTimestamp)
            interaction.client.channels.cache.get(log).send({embeds:[Log]})
        }
        else if(deleted){
            if(!kontrol) return interaction.reply({embeds:[embed("","Ayrılma Mesaj Kanalı Bulunmamaktadır","RED")]})
            db.delete(`member_leaved_channel_${interaction.guild.id}`)
            interaction.reply({embeds:[embed("","Ayrılma Mesaj Kanalı Sıfırlanmıştır","BLURPLE")]})

            const log = db.fetch(`log_${interaction.guild.id}`)
            if(!log) return;

            const Log = new MessageEmbed()
            .setTitle("Ayrılma Mesaj Kanalı Sıfırlanmıştır")
            .setColor("#2F3136")
            .addFields([
                {name:"Sıfırlanan Kanal",value:`<#${kontrol}>`,inline:true},
                {name:"Sıfırlayan Yetkili",value:`${interaction.user}`,inline:true},
                {name:"Sıfırlanma Zaman",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true}
            ])
            .setFooter({text:`Sıfırlanan Kanal ID: ${kontrol}`})
            .setTimestamp(interaction.createdTimestamp)
            interaction.client.channels.cache.get(log).send({embeds:[Log]})
        }
        else{
            return interaction.reply({embeds:[embed("","Bir Ayar Belirtiniz","RED")]})
        }

        
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addChannelOption(option => 
        option.setName("kanal")
        .setDescription("Hoşgeldin Kanalını Ayarlarsınız")
        .addChannelTypes(ChannelType.GuildText)
        )
    .addStringOption(opt => 
        opt.setName("sıfırla")
        .setDescription("Ayarlanan Kanalı Sıfırlar")
        .addChoices(
            {name:"Kanalı Sıfırla",value:"sıfırla"}
        )
        )
    module.exports = { data, slash_data }