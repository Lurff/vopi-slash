const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { ChannelType } = require("discord-api-types/v9")

const db = require("orio.db")

const data = {
    name:"çekiliş-kazanan-yenile",
    description:"Çekiliş Kazananını Yeniden Çekersiniz",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const giveawayID = interaction.options.getString("çekiliş-ıd")

        const fetch = db.fetch(`cekilisidsi_${giveawayID}`)

        if(!fetch) return interaction.reply({embeds:[embed("","Çekiliş Kazananını Yeniden Seçmek İçin İlk Önce Çekilişin Bitmesi Gerekmektedir","RED")],ephemeral: true})

        else{

            const channelId = db.fetch(`cekilisidsi_${giveawayID}.mesaj.kanal`)
            const messageId = db.fetch(`cekilisidsi_${giveawayID}.mesaj.id`)
            const prize = db.fetch(`giveaways_${messageId}.verilecek`)
            const sayı = db.fetch(`giveaways_${messageId}.kazanacak`)
            const channel = interaction.client.channels.cache.get(channelId)

            const data = db.get(`giveaways_${messageId}.kazananlar`)

            if(!data.length) return interaction.reply({embeds:[embed("","Yeterli Katılımcı Bulunmadığı İçin Çekiliş Kazananı Yeniden Seçilemedi","RED")],ephemeral: true})

            else{

                const winnersID = db.get(`giveaway_winners_${giveawayID}`)

                    for(i = 0; i <= (sayı-1); i++){

                        const randomWinner = data[Math.floor(Math.random() * data.length)]

                        if(winnersID?.includes(randomWinner)) continue


                        db.push(`giveaway_winners_${giveawayID}`,randomWinner)

                        
                        
                    }

                    const winner = db.get(`giveaway_winners_${giveawayID}`)
            
                channel.messages.fetch(messageId).then(msg => {

                    const timeoutRow = new MessageActionRow()
                    .setComponents(
                    new MessageButton()
                    .setStyle("DANGER")
                    .setLabel("Çekiliş Bitmiştir")
                    .setDisabled(true)
                    .setCustomId("timeout")
                    )

                    const newEmbed = new MessageEmbed()
                    .setColor("BLURPLE")
                    .setTitle("Çekilişin Kazananı Yeniden Çekildi")
                    .setDescription(`Kazananlar <@${winner.join("> | <@")}>`)
                    .setFooter({text:`Çekiliş Bitti | Çekiliş ID ${giveawayID} | Kazanılan Ödül ${prize}`})

                    msg.edit({ components: [timeoutRow] ,embeds: [newEmbed]})

                    db.delete(`giveaway_winners_${giveawayID}`)

                })

                interaction.reply({embeds:[embed("","Çekiliş Kazananı Yeniden Çekilmiştir","BLURPLE")],ephemeral: true})

                
            }

        }
     }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .addStringOption(option => 
        option.setName("çekiliş-ıd")
        .setDescription("Çekilişin ID'sini Giriniz")
        .setRequired(true)
        )
    .setDMPermission(false)
    module.exports = { data, slash_data }