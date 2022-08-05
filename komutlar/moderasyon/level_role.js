const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"seviye-rol",
    description:"Kaçıncı Seviyede Hangi Rolü Ekleyeceğinizi Belirler",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const rol = interaction.options.getRole("rol")
        const seviye = interaction.options.getInteger("seviye")

        const kontrol = db.fetch(`seviye_sistemi_${interaction.guild.id}`)
        if(!kontrol) return interaction.reply({embeds:[embed("","Seviye Sisteminiz Aktif Değildir","RED")]})

        if(rol.rawPosition >= interaction.guild.me.roles.highest.rawPosition) return interaction.reply({embeds:[embed("",`${rol} Adlı Rol, Botun Rolünün Üzerinde Bulunduğu İçin İşlem Yapılamamamıştır`,"RED")]})
        db.push(`seviye-rol_${interaction.guild.id}`,{rol:rol.id, seviye:Number(seviye)})
        return interaction.reply({embeds:[embed("",`Kullanıcı Seviyesi **${seviye}** Olduğunda ${rol} Adlı Rol Verilecektir`,"BLURPLE")]})


        
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addIntegerOption(opt => 
        opt.setName("seviye")
        .setDescription("Hangi Seviye De Rol Alınacağı Seviyeyi Ayarlarsınız")
        .setRequired(true)
        )
    .addRoleOption(option => 
        option.setName("rol")
        .setDescription("Seviye'ye Karşılık Rolü Eklersiniz")
        .setRequired(true)
        )
    module.exports = { data, slash_data }