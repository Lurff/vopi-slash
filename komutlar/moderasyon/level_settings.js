const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const { ChannelType } = require("discord-api-types/v9")

const db = require("orio.db")

const data = {
    name:"seviye-ayar",
    description:"Sunucunuzdaki Seviye Sisteminizi Özelleştirirsiniz",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const manage = interaction.options.getChannel("log-kanal")
        const requiredXP = interaction.options.getInteger("gerekli-xp")
        const required_msg_xp = interaction.options.getInteger("mesaj-xp")

        const kontrol = db.fetch(`seviye_sistemi_${interaction.guild.id}`)
        if(!kontrol) return interaction.reply({embeds:[embed("","Seviye Sisteminiz Aktif Değildir","RED")]})

        db.set(`level_log_${interaction.guild.id}`,manage.id) 
        if( requiredXP === 0){
            db.set(`xp_level_${interaction.guild.id}`, 250)
        }
        else{ 
            db.set(`xp_level_${interaction.guild.id}`, Number(requiredXP))
        }
        if(required_msg_xp === 0){
             db.set(`xp_mesaj_${interaction.guild.id}`, 1)
        }
        else{
            db.set(`xp_mesaj_${interaction.guild.id}`, Number(required_msg_xp))
        }
        return interaction.reply({embeds:[embed("",`Seviye Ayarlarınız Özelleştirilmiştir`,"BLURPLE")]})
        
        


        
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addChannelOption(option => 
        option.setName("log-kanal")
        .setDescription("Seviye Atlayan Kullanıcıya Özel Bir Mesajı Ayarlanan Kanal Gönderir")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
        )
    .addIntegerOption(opt => 
        opt.setName("gerekli-xp")
        .setDescription("Seviye Atlamak İçin Gerekli Xp'yi Ayarlarsınız Varsayılan: 250XP")
        .setMinValue(0)
        .setRequired(true)
        )
    .addIntegerOption(op => 
        op.setName("mesaj-xp")
        .setDescription("Mesaj Başına Alınacak XP'yi Ayarlarsınız Varsayılan: 1XP")
        .setMinValue(0)
        .setRequired(true)
        )
    module.exports = { data, slash_data }