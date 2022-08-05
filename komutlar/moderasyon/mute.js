const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")
const ms = require("milisaniye")

const db = require("orio.db")

const data = {
    name:"sustur",
    description:"Suncudan Seçtiğiniz Üyeyi Süreli Olarak Susturur",
    permission:"BAN_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")
        const time = interaction.options.getString("süre")
        const reason = interaction?.options.getString("sebep") || "Sebep Belirtilmedi"

        if(time === "0" ) return interaction.reply({embeds:[embed("","Kullanıcıyı Susturmak İçin Örnek Parametreleri \n`1 Gün, 1 Saat, 1 Dakika, 1 Yıl, 1 Ay` Giriniz","RED")]})

        const tme = ms(time)

        if(!user.moderatable) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Hakkında Bir İşlem Yapılamamaktadır`,"RED")]})

        user.timeout(tme,reason).then(() => {
            
            interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı **"${reason}"** Sebebiyle **${time}** Süreyle Geçici Olarak Susturulmuştur`,"BLURPLE")]})

            let log = db.fetch(`log_${interaction.guild.id}`)
            if(!log) return;

            const Log = new MessageEmbed()
            .setTitle("Kullanıcı Susturuldu")
            .addFields([
                {name:"Susturulan Kullanıcı",value:`${user}`,inline:true},
                {name:"Susturan Yetkili",value:`${interaction.user}`,inline:true},
                {name:"Susturulma Zamanı",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true},
                {name:"Susturulma Sebebi",value:`${reason}`}
            ])
            .setColor("#2F3136")
            .setFooter({text:`Susturma Süresi: ${time}`})
            .setTimestamp(interaction.createdTimestamp)
            interaction.client.channels.cache.get(log).send({embeds:[Log]})
        }).catch(() => {
            return interaction.reply({embeds:[embed("","Bu Kullanıcıyı Susturulamaz","RED")]})
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
    .addStringOption(opti => 
        opti.setName("süre")
        .setDescription("Ne Kadar Süredir Susturululacağını Belirtiniz Örnek Parametre: 1 Gün, 1 Saat, 1 Dakika, 1 Yıl, 1 Ay")
        .setRequired(true)
        )
    .addStringOption(opt => 
        opt.setName("sebep")
        .setDescription("Kullanıcıyı Yasaklamak İçin Bir Sebep Belirtmelisniz")
        )
    module.exports = { data, slash_data }