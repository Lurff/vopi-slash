const { SlashCommandBuilder } = require("@discordjs/builders")
const { ChannelType } = require("discord-api-types/v9")
const {MessageEmbed} = require("discord.js")
const twitch_client_id = "g2v3ag7ssz6zlpyypxkfoquwctg7e4"
const twitch_token = "ghv2s1nw93zt74rwlnseskknm6z9x6"

const fetch = require("node-fetch")
const db = require("orio.db")

const data = {
    name:"twitch",
    description:"Canlı Yayın Açılınca Belirtilen Kanala Duyuru Mesajı Ata",
    permission:"BAN_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getString("kullanıcı")
        const channel = interaction.options.getChannel("kanal")


        let log = db.fetch(`log_${interaction.guild.id}`)
        if(!log) return;
        
        fetch(`https://api.twitch.tv/helix/search/channels?query=${user}&first=1`,{
            method:"GET",
            headers: { "client-id": twitch_client_id, "Authorization":`Bearer ${twitch_token}` }
          }).then(response => response.json().then(res => {
            if(!res.data.length) return interaction.reply({embeds:[embed("","Bu Kullanıcı Adına Ait Bir Kullanıcı Bulunamadı","RED")]})
            db.set(`twitch_${interaction.guild.id}`, res.data[0].broadcaster_login)
            db.set(`twitch_notification_${interaction.guild.id}`, channel.id)
            return interaction.reply({embeds:[embed("","Ayarlarınız Başarılı Bir Şekilde Kayıt Edildi","BLURPLE")]})
          })).catch(() => {
            return interaction.reply({embeds:[embed("","Bu Kullanıcı Adına Ait Bir Kullanıcı Bulunamadı","RED")]})
          })
    
            
        
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addStringOption(option => 
        option.setName("kullanıcı")
        .setDescription("Lütfen Bir Twitch Kullanıcı Adı Giriniz")
        .setRequired(true)
        )
    .addChannelOption(opt => 
        opt.setName("kanal")
        .setDescription("Canlı Yayın Bildirim Kanalını Ayarlar")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
        )
    module.exports = { data, slash_data }