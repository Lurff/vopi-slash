const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"uyar",
    description:"Suncudan Belirtilen Kullanıcı Uyarılır",
    permission:"MODERATE_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { guild } = interaction
        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")
        const reason = interaction.options.getString("sebep") 

        if(!user.moderatable) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Hakkında Bir İşlem Yapılamamaktadır`,"RED")]})

        db.add(`warn_number_${interaction.guild.id}_${user.id}`,1)

        const warnNumber = db.fetch(`warn_number_${interaction.guild.id}_${user.id}`)
        db.push(`warn_reason_${interaction.guild.id}_${user.id}`,`${reason}\n`)
        db.push(`warn_${interaction.guild.id}_${user.id}`,`**${warnNumber}.${reason}**\n *» ${interaction.user} Tarafından <t:${Math.floor(interaction.createdTimestamp/1000)}> Zamanında Oluşturuldu*\n`)
        interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı **"${reason}"** Sebebiyle Uyarılmıştır`,"BLURPLE")]})

        const userLog = new MessageEmbed()
        .setAuthor({name:`${interaction.guild.name} Adlı Sunucu Tarafından Uyarıldınız`,iconURL:interaction.guild.iconURL({dynamic:true})})
        .setColor("RED")
        .setDescription(`
        **Uyarılma Sebebi:** \`\`${reason}\`\`
        **Uyaran Yetkili:** ${interaction.user}
        **Uyarılma Zamanı:** <t:${Math.floor(interaction.createdTimestamp/1000)}>
        `)
        .setFooter({text:`${interaction.user.tag} | Uyarılma Zamanı`,iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setTimestamp(interaction.createdTimestamp)

        user.send({embeds:[userLog]})
        .catch(() => {
            return;
        })

        let log = db.fetch(`log_${interaction.guild.id}`)
        if(!log) return;

        const Log = new MessageEmbed()
        .setTitle("Kullanıcı Uyarıldı")
        .setColor("#2F3136")
        .addFields([
            {name:"Uyarılan Kullanıcı",value:`${user}`,inline:true},
            {name:"Uyaran Yetkili",value:`${interaction.user}`,inline: true},
            {name:"Uyarılma Zamanı",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true},
            {name:"Uyarılma Sebebi",value:`${reason}`}
        ])
        .setFooter({text:`Uyarılan Kullanıcı ID: ${user.id} | Toplam Uyarı Sayısı: ${warnNumber}`})
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
        .setDescription("Lütfen Bir Kullanıcı ID'si Giriniz")
        .setRequired(true)
        )
    .addStringOption(opt => 
        opt.setName("sebep")
        .setDescription("Uyarmak İçin Bir Sebep Girmelisiniz")
        .setRequired(true)
        )
    module.exports = { data, slash_data }