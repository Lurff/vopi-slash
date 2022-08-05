const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

const data = {
    name:"yardım",
    description:"Botun Yardım Menüsünü Görüntüler",
    category:"bot",
    execute(interaction) {

        const { client } = interaction
        const { emoji } = client

        const menu = new MessageEmbed()
        .setTitle('Vopi Bot Yardım Menüsü')
        .setColor('BLURPLE')
        .setDescription(`Vopi Bot Müzik Ve Gelişmiş Moderasyon Sistemi İle Donatılmış Bir Bottur.`)
        .addFields([
            {name:`${emoji("member")} Genel Komutlar`,value:"Genel Komutlarına Erişebilmek İçin Aşağıdaki Menüden Genel Komutlar Kategorisini Seçiniz",inline:true},
            {name:`${emoji("staff")} Yetkili Komutları`,value:"Yetkili Komutlarına Erişebilmek İçin Aşağıdaki Menüden Yetkili Komutları Kategorisini Seçiniz",inline:true},
            {name:`${emoji("music")} Müzik Komutları`,value:"Müzik Komutlarına Erişebilmek İçin Aşağıdaki Menüden Müzik Komutları Kategorisini Seçiniz",inline:true},
            {name:`\u200b`,value:"\u200b",inline:true},
            {name:`${emoji("bot")} Bot Komutları`,value:"Bot Komutlarına Erişebilmek İçin Aşağıdaki Menüden Bot Komutları Kategorisini Seçiniz",inline:true},
            {name:`\u200b`,value:"\u200b",inline:true},

        ])

        const helpMenu = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId("help_menu")
            .addOptions([
                {emoji:`${emoji("member")}`,label:"Genel Komutlar",description:"Genel Komutlar Kategorisine Erişmek İçin Tıklayınız",value:"general_commands"},
                {emoji:`${emoji("staff")}`,label:"Yetkili Komutları",description:"Yetkili Komutlar Kategorisine Erişmek İçin Tıklayınız",value:"staff_commands"},
                {emoji:`${emoji("music")}`,label:"Müzik Komutları",description:"Müzik Komutları Kategorisine Erişmek İçin Tıklayınız",value:"music_command"},
                {emoji:`${emoji("bot")}`,label:"Bot Komutları",description:"Bot Komutları Kategorisine Erişmek İçin Tıklayınız",value:"bot_commands"}
            ])
            .setMaxValues(1)
            .setPlaceholder("Seçmek İstediğin Komut Kategorisi İçin Tıklayınız")
            .setMinValues(0)
            
        )
        return interaction.reply({embeds:[menu],components:[helpMenu]})
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    
    module.exports = { data, slash_data }