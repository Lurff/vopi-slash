const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"unban",
    description:"Suncudan Belirtilen ID'deki Kullanıcının Yasağını Kaldırır",
    permission:"BAN_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { guild } = interaction
        const { embed } = interaction.client

        const user = interaction.options.getUser("kullanıcı")
        const reason = interaction?.options.getString("sebep") || "Sebep Belirtilmedi"

        guild.members.unban(user, reason).then(() => {
            
            interaction.reply({embeds:[embed("",`**${user}** Adlı Kullanıcı **"${reason}"** Sebebiyle Sunucudan Yasaklandı`,"BLURPLE")]})

            let log = db.fetch(`log_${interaction.guild.id}`)
            if(!log) return;

            const Log = new MessageEmbed()
            .setTitle("Kullanıcının Yasağı Kaldırıldı")
            .addFields([
                {name:"Yasağı Kaldırılan Kullanıcı",value:`<@${user}>`,inline:true},
                {name:"Yetkili",value:`${interaction.user}`,inline:true},
                {name:"Yasağı Kaldırılma Zamanı",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true},
                {name:"Yasağı Kaldırılma Sebebi",value:`${reason}`}
            ])
            .setColor("#2F3136")
            .setFooter({text:`Yasaklanan Kullanıcı ID: ${user}`})
            .setTimestamp(interaction.createdTimestamp)
            interaction.client.channels.cache.get(log).send({embeds:[Log]})
        }).catch(() => {
            return interaction.reply({embeds:[embed("",`**${user}** Adında Bir Yasaklı Kullanıcı Bulunmamaktadır`,"RED")]})
        })
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addUserOption(option => 
        option.setName("kullanıcı")
        .setDescription("Lütfen Bir Kullanıcı ID'si Giriniz")
        .setRequired(true)
        )
    .addStringOption(opt => 
        opt.setName("sebep")
        .setDescription("Kullanıcıyı Yasaklamak İçin Bir Sebep Belirtmelisniz")
        )
    module.exports = { data, slash_data }