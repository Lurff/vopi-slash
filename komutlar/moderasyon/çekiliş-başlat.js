const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { ChannelType } = require("discord-api-types/v9")
const randomstring = require("randomstring")

const ms = require("milisaniye")

const db = require("orio.db")

const data = {
    name:"çekiliş",
    description:"Süreli Çekiliş Yapmanızı Sağlar",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const channel = interaction.options.getChannel("kanal")
        const time = interaction.options.getString("süre")
        const prize = interaction.options.getString("ödül")
        const requiredUser = interaction.options.getInteger("kazanacak-sayısı")

        let timems = ms(time) 

        if(timems == 0) return interaction.reply({embeds:[embed("","Geçerli Bir Zaman Dilimi Giriniz","RED")]})
        if(requiredUser == 0) return interaction.reply({embeds:[embed("","Çekilişi Kazanacak Kullanıcı Sayısı 0 Dan Fazla Olmalıdır","RED")]})

        const bitecegizamanms = Date.now() + ms(time.replace(' dakika', 'm').replace(' saat', 'h').replace(' saniye', 's').replace(' gün', 'd'))
        const cekilisid = randomstring.generate({ length: 6, readable: true, charset: 'alphabetic', capitalization: 'uppercase' })

        const getChannel = interaction.client.channels.cache.get(channel.id)

        interaction.reply({embeds:[embed("","Çekiliş Başlatılmıştır","BLURPLE")]})

        const giveAway = new MessageEmbed()
        .setColor("BLURPLE")
        .setTitle("Çekiliş Başlatıldı")
        .setDescription(`Çekilişe Katılabilmek İçin Aşağıda Bulunan **\`Çekilişe Katıl\`** Butonuna Tıklamanız Yeterlidir`)
        .setTimestamp(bitecegizamanms)
        .setFooter({text:`Kazanan sayısı: ${requiredUser} | Çekiliş ID: ${cekilisid} | Çekiliş Başlatıldı | Bitiş:`})
        .addFields([
            {name:"Çekilişi Başlatan Kullanıcı",value:`${interaction.user}`,inline:true},
            {name:"Çekilişte Verilicek Ödül",value:`${prize}`,inline:true},
            {name:"Çekilişin Biteceği Zaman",value:`<t:${parseInt((Date.now() + timems) / 1000)}:D>\n(<t:${parseInt((Date.now() + timems) / 1000)}:R>)`,inline:true},
        ]) 

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("cekilis")
            .setLabel("Çekilişe Katıl")
            .setStyle("PRIMARY")
            .setEmoji("🎉")
        )

        const timeoutRow = new MessageActionRow()
        .setComponents(
            new MessageButton()
            .setStyle("DANGER")
            .setLabel("Çekiliş Bitmiştir")
            .setDisabled(true)
            .setCustomId("timeout")
        )

        getChannel.send({embeds:[giveAway],components:[row]}).then(msg => {
           db.set(`giveaways_${msg.id}`,{mesaj: {id: msg.id, kanal: msg.channelId, sunucu: msg.guildId}, kazanacak: requiredUser, verilecek: prize, bitecek: bitecegizamanms, sahibi: interaction.user.id, olusturma: Date.now(), kazananlar: [], cekilisid: cekilisid})
           db.set(`giveaways_${cekilisid}`,{mesaj: {id: msg.id, kanal: msg.channelId, sunucu: msg.guildId}, kazanacak: requiredUser, verilecek: prize, bitecek: bitecegizamanms, sahibi: interaction.user.id, olusturma: Date.now(), kazananlar: [], cekilisid: cekilisid})

           const collector = msg.createMessageComponentCollector({time: timems})

           collector.on("collect",i => {

                if(i.customId == "cekilis"){

                    const data = db.get(`giveaways_${msg.id}.kazananlar`)

                    if(data?.includes(i.user.id)) return i.reply({embeds:[embed("","Çekilişe Zaten Katılmışsınız","RED")],ephemeral:true})
                    else{
                        db.push(`giveaways_${msg.id}.kazananlar`,i.user.id)
                        return i.reply({embeds:[embed("","Çekilişe Başarılı Bir Şekilde Katıldınız","BLURPLE")],ephemeral: true})
                    }
                }
           })

           collector.on("end",collected => {

            const time = db.fetch(`giveaways_${msg.id}.bitecek`)
            const winnerCount = db.fetch(`giveaways_${msg.id}.kazanacak`)
            const winners = db.get(`giveaways_${msg.id}.kazananlar`)
            const prize = db.fetch(`giveaways_${msg.id}.verilecek`)

            db.set(`cekilisidsi_${cekilisid}`, {mesaj: {id: msg.id, kanal: msg.channelId, sunucu: msg.guildId}, kazananlar: [], cekilisid: cekilisid})

            setTimeout(() => {

                if(winners.length){

                    const winnersID = db.get(`giveaway_winners_${cekilisid}`)

                    for(i = 0; i <= (winnerCount-1); i++){

                        const randomWinner = winners[Math.floor(Math.random() * winners.length)]

                        if(winnersID?.includes(randomWinner)) continue


                        db.push(`giveaway_winners_${cekilisid}`,randomWinner)

                        
                        
                    }

                    const winner = db.get(`giveaway_winners_${cekilisid}`)

                    const newEmbed = new MessageEmbed()
                    .setColor("BLURPLE")
                    .setTitle("Çekiliş Sona Erdi")
                    .setDescription(`Kazananlar <@${winner.join("> | <@")}>`)
                    .setFooter({text:`Çekiliş Bitti | Çekiliş ID ${cekilisid} | Kazanılan Ödül ${prize}`})

                    msg.edit({ components: [timeoutRow] ,embeds: [newEmbed]})

                    db.delete(`giveaway_winners_${cekilisid}`)

                }else{
                    msg.edit({ components: [timeoutRow] ,embeds: [embed("","Yeterli Katılım Olmadığı İçin Kazanan Çıkmadı","RED")]})
                }
                
            },time)
            
           })
        
        }).catch(() => {
            return interaction.reply({embeds:[embed("","Çekiliş Verileri Silindiği İçin Çekiliş Kazananı Bulunmamaktadır","RED")],ephemeral: true})
        })

     }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .addStringOption(option => 
        option.setName("süre")
        .setDescription("Çekilişin Süresini Belirlersiniz (1 saniye 2 saat 4 gün)")
        .setRequired(true)
        )
    .addChannelOption(opt => 
        opt.setName("kanal")
        .setDescription("Çekilişin Yapılacağı Kanalı Seçiniz")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
        )
    .addStringOption(opti => 
        opti.setName("ödül")
        .setDescription("Çekilişte Verilecek Ödülü Belirlersiniz")
        .setRequired(true)
        )
    .addIntegerOption(op => 
        op.setName("kazanacak-sayısı")
        .setDescription("Çekilişi Kazanacak Kullanıcı Sayısını Ayarlayınız")
        .setRequired(true)
        )
    .setDMPermission(false)
    module.exports = { data, slash_data }