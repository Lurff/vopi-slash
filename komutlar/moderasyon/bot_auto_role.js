const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

const db = require("orio.db")

const data = {
    name:"bot-otorol",
    description:"Seçilen Rol Bot Otorol Olarak Ayarlanır",
    permission:"MANAGE_ROLES",
    category:"staff",
    execute(interaction) {

        const { embed } = interaction.client

        const role = interaction?.options.getRole("ayarla")
        const deleted = interaction?.options.getString("sıfırla")
        
        if(role && deleted){
            return interaction.reply({embeds:[embed("","Lütfen Ayarları Teker Teker Yapınız","RED")]})
        }
        else if(role){

            const dected = db.fetch(`bot_auto_role_${interaction.guild.id}`)
            
            if(role.rawPosition >= interaction.guild.me.roles.highest.rawPosition) return interaction.reply({embeds:[embed("",`${rol} Adlı Rol, Botun Rolünün Üzerinde Bulunduğu İçin İşlem Yapılamamamıştır`,"RED")]})
            if(role.id === dected) return interaction.reply({embeds:[embed("",`${role} Adlı Rol Daha Önce Kayıt Edilmiştir`,"RED")]})

            db.set(`bot_auto_role_${interaction.guild.id}`,role.id)
            interaction.reply({embeds:[embed("",`${role} Adlı Rol Bot Otorol Olarak Ayarlanmıştır`,"BLURPLE")]})

            let log = db.fetch(`log_${interaction.guild.id}`)
            if(!log) return;

            const Log = new MessageEmbed()
            .setTitle("Bot Otorol Ayarlandı")
            .setColor("#2F3136")
            .addFields([
                {name:"Ayarlanan Bot Rolü",value:`${role}`,inline:true},
                {name:"Ayarlayan Yetkili",value:`${interaction.user}`,inline:true},
                {name:"Ayarlanma Zaman",value:`<t:${Math.floor(interaction.createdTimestamp/1000)}>`,inline:true}
            ])
            .setFooter({text:`Ayarlanan Rol ID: ${role.id}`})
            .setTimestamp(interaction.createdTimestamp)
            interaction.client.channels.cache.get(log).send({embeds:[Log]})
      

        }
        else if(deleted){
            const dected = db.fetch(`bot_auto_role_${interaction.guild.id}`)
            if(!dected) return interaction.reply({embeds:[embed("","Ayarlanmış Bir Otorol Bulunmamaktadır","RED")]})

            db.delete(`bot_auto_role_${interaction.guild.id}`)
            return interaction.reply({embeds:[embed("","Otoroller Sıfırlanmıştır","BLURPLE")]})
        }
        else{
            return interaction.reply({embeds:[embed("","Lütfen Bir Ayar Seçiniz","RED")]})
        }
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .setDMPermission(false)
    .addRoleOption(opt => 
        opt.setName("ayarla")
        .setDescription("Belirtilen Rolü Bot Otorol'ü Olarak Ayarlar")
        )
    .addStringOption(op => 
        op.setName("sıfırla")
        .setDescription("Ayarlanmış Otorolü Sıfırlar")
        .addChoices(
            {name:"Otorolleri Sıfırla",value:"sıfırla"}
        )
        )
    module.exports = { data, slash_data }