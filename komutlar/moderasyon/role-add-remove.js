const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"rol",
    description:"Seçilen Kullanıcıya Belirtilen Rol Verir Veya Alır",
    permission:"BAN_MEMBERS",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const user = interaction.options.getMember("kullanıcı")
        const remove = interaction?.options.getRole("al")
        const add = interaction?.options.getRole("ver")
        
        if(remove && add){
            return interaction.reply({embeds:[embed("","İşlemleri Teker Teker Yapınız","RED")]})
        }
        else if(add){

            if(!user.moderatable) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Hakkında Bir İşlem Yapılamamaktadır`,"RED")]})

            if(user.roles.cache.has(add.id)) return interaction.reply({embeds:[embed("",`${add} Adlı Rol Kullanıcıda Bulunmaktadır`,"RED")]})
            if(add.rawPosition >= interaction.guild.me.roles.highest.rawPosition) return interaction.reply({embeds:[embed("",`${add} Adlı Rol, Botun Rolünün Üzerinde Bulunduğu İçin İşlem Yapılamamamıştır`,"RED")]})
            user.roles.add(add).then(() => {
                    interaction.reply({embeds:[embed("",`${add} Adlı Rol ${user} Adlı Kullanıcıya Verilmiştir`,"BLURPLE")]})

                    let log = db.fetch(`log_${interaction.guild.id}`)
                    if(!log) return;

                    const Log = new MessageEmbed()
                    .setTitle("Kullanıcıya Rol Verildi")
                    .addFields([
                        {name:"Rol Verilen Kullanıcı",value:`${user}`,inline:true},
                        {name:"Rol Veren Yetkili",value:`${interaction.user}`,inline:true},
                        {name:"Rol Verilme Zamanı",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true},
                        {name:"\u200b",value:`\u200b`,inline:true},
                        {name:"Verilen Rol",value:`${add}`,inline:true},
                        {name:"\u200b",value:`\u200b`,inline:true},
                    ])
                    .setColor("#2F3136")
                    .setFooter({text:`Rol Verilen Kullanıcı ID: ${user.id}`})
                    .setTimestamp(interaction.createdTimestamp)
                    interaction.client.channels.cache.get(log).send({embeds:[Log]})
                }).catch(() => {
                    return interaction.reply({embeds:[embed("","Bu Kullanıcıya Rol Verilemektedir","RED")]})
                
                })
            
        }
        else if(remove){

            if(!user.moderatable) return interaction.reply({embeds:[embed("",`${user} Adlı Kullanıcı Hakkında Bir İşlem Yapılamamaktadır`,"RED")]})

            if(!user.roles.cache.has(remove.id)) return interaction.reply({embeds:[embed("",`${remove} Adlı Rol Kullanıcıda Bulunmamaktadır`,"RED")]})
            if(remove.rawPosition >= interaction.guild.me.roles.highest.rawPosition) return interaction.reply({embeds:[embed("",`${remove} Adlı Rol, Botun Rolünün Üzerinde Bulunduğu İçin İşlem Yapılamamamıştır`,"RED")]})
                
             user.roles.remove(remove).then(() => {
                    interaction.reply({embeds:[embed("",`${remove} Adlı Rol ${user} Adlı Kullanıcıdan Alınmıştır`,"BLURPLE")]})

                    let log = db.fetch(`log_${interaction.guild.id}`)
                    if(!log) return;

                    const Log = new MessageEmbed()
                    .setTitle("Kullanıcıdan Rol Alındı")
                    .addFields([
                        {name:"Rol Alınan Kullanıcı",value:`${user}`,inline:true},
                        {name:"Rol Alan Yetkili",value:`${interaction.user}`,inline:true},
                        {name:"Rol Alınma Zamanı",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true},
                        {name:"\u200b",value:`\u200b`,inline:true},
                        {name:"Alınan Rol",value:`${remove}`,inline:true},
                        {name:"\u200b",value:`\u200b`,inline:true},
                    ])
                    .setColor("#2F3136")
                    .setFooter({text:`Rol Verilen Kullanıcı ID: ${user.id}`})
                    .setTimestamp(interaction.createdTimestamp)
                    interaction.client.channels.cache.get(log).send({embeds:[Log]})
                }).catch(() => {
                    return interaction.reply({embeds:[embed("","Bu Kullanıcıya Rol Alınamamaktadır","RED")]})
                
                })
            
        }
        else{
            return interaction.reply({embeds:[embed("","Lütfen Bir Ayar Belirtiniz","RED")]})
        }
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
    .addRoleOption(opt => 
        opt.setName("al")
        .setDescription("Kullanıcıya Seçilen Rolü Alır")
        )
    .addRoleOption(op => 
        op.setName("ver")
        .setDescription("Kullanıcıya Seçilen Rol Verilir")
        )
    module.exports = { data, slash_data }