const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"ban",
    description:"Suncudan Seçtiğiniz Üyeyi Yasaklar",
    permission:"BAN_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")
        const reason = interaction?.options.getString("sebep") || "Sebep Belirtilmedi"

        if(!user.bannable) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Hakkında Bir İşlem Yapılamamaktadır`,"RED")]})

        user.ban({reason: reason}).then(() => {
            
            interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı **"${reason}"** Sebebiyle Sunucudan Yasaklandı`,"BLURPLE")]})

            let log = db.fetch(`log_${interaction.guild.id}`)
            if(!log) return;

            const Log = new MessageEmbed()
            .setTitle("Kullanıcı Yasaklandı")
            .addFields([
                {name:"Yasaklanan Kullanıcı",value:`${user}`,inline:true},
                {name:"Yetkili",value:`${interaction.user}`,inline:true},
                {name:"Yasaklanma Zamanı",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true},
                {name:"Yasaklanma Sebebi",value:`${reason}`}
            ])
            .setColor("#2F3136")
            .setFooter({text:`Yasaklanan Kullanıcı ID: ${user.id}`})
            .setTimestamp(interaction.createdTimestamp)
            interaction.client.channels.cache.get(log).send({embeds:[Log]})
        }).catch(() => {
            return interaction.reply({embeds:[embed("","Bu Kullanıcıyı Sunucudan Yasaklanamaz","RED")]})
        })
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addUserOption(option => 
        option.setName("kullanıcı")
        .setDescription("Lütfen Bir Kullanıcı'yı Seçiniz")
        .setRequired(true)
        )
    .addStringOption(opt => 
        opt.setName("sebep")
        .setDescription("Kullanıcıyı Yasaklamak İçin Bir Sebep Belirtmelisniz")
        )
    module.exports = { data, slash_data }