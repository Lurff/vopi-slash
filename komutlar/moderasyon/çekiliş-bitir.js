const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { ChannelType } = require("discord-api-types/v9")

const db = require("orio.db")

const data = {
    name:"çekiliş-bitir",
    description:"Çekilişi Bitirirsiniz",
    permission:"ADMINISTRATOR",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const giveawayID = interaction.options.getString("çekiliş-ıd")

        const fetch = db.fetch(`giveaways_${giveawayID}`)

        if(!fetch) return interaction.reply({embeds:[embed("","Çekilişin Bitirilmesi İçin Bir Çekiliş Olması Gereklidir","RED")],ephemeral: true})

        else{

            const channelId = db.fetch(`giveaways_${giveawayID}.mesaj.kanal`)
            const messageId = db.fetch(`giveaways_${giveawayID}.mesaj.id`)
            const prize = db.fetch(`giveaways_${messageId}.verilecek`)
            const channel = interaction.client.channels.cache.get(channelId)
            const sayı = db.fetch(`giveaways_${messageId}.kazanacak`)

            const data = db.get(`giveaways_${messageId}.kazananlar`)

            if(!data.length) return interaction.reply({embeds:[embed("","Yeterli Katılımcı Bulunmadığı İçin Çekiliş Kazananı Yeniden Seçilemedi","RED")],ephemeral: true})
        
            else{

                const winnersID = db.get(`giveaway_winners_${giveawayID}`)

                    for(i = 0; i <= (sayı-1); i++){

                        const randomWinner = data[Math.floor(Math.random() * data.length)]

                        if(winnersID?.includes(randomWinner)) continue


                        db.push(`giveaway_winners_${giveawayID}`,randomWinner)

                        
                        
                    }

                channel.messages.fetch(messageId).then(async msg => {
                    
                  db.set(`giveaways_${msg.id}.bitecek`,0)  

                  const winner = db.get(`giveaway_winners_${giveawayID}`)

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
                  .setTitle("Çekiliş Sona Erdi")
                  .setDescription(`Kazananlar <@${winner.join("> | <@")}>`)
                  .setFooter({text:`Çekiliş Bitti | Çekiliş ID ${giveawayID} | Kazanılan Ödül ${prize}`})

                  msg.edit({ components: [timeoutRow] ,embeds: [newEmbed]})

                  db.delete(`giveaways_${giveawayID}`)
                  db.delete(`giveaway_winners_${giveawayID}`)

                })

                interaction.reply({embeds:[embed("","Çekiliş Bitirilmiştir","BLURPLE")],ephemeral: true})

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