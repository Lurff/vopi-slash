const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"sil",
    description:"Belirtilen Sayıdaki Mesajları Siler",
    permission:"MANAGE_MESSAGES",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getInteger("sayı")

        interaction.channel.bulkDelete(user).then(() => {
            
            interaction.reply({embeds:[embed("",`Başarılı Bir Şekilde **${user}** Mesaj Silindi`,"BLURPLE")]})

            let log = db.fetch(`log_${interaction.guild.id}`)
            if(!log) return;

            const Log = new MessageEmbed()
            .setTitle("Toplu Mesaj Silindi")
            .addFields([
                {name:"Mesaj Silen Yetkili",value:`${interaction.user}`,inline:true},
                {name:"Mesajların Silindiği Kanal",value:`${interaction.channel}`,inline:true},
                {name:"Yasaklanma Zamanı",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true},
            ])
            .setColor("#2F3136")
            .setFooter({text:`Silinen Mesaj Sayısı: ${user}`})
            .setTimestamp(interaction.createdTimestamp)
            interaction.client.channels.cache.get(log).send({embeds:[Log]})
        }).catch(() => {
            return interaction.reply({embeds:[embed("","14 Günden Önceki Mesajlar Silinemez","RED")]})
        })
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addIntegerOption(option => 
        option.setName("sayı")
        .setDescription("Silinecek Mesaj Sayısını Yazınız")
        .setMaxValue(101)
        .setMinValue(0)
        .setRequired(true)
        )
    module.exports = { data, slash_data }