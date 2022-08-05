const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

const data = {
    name:"banner",
    description:"Kullanıcı Etiketlenirse Kullanıcının Profil Afişi Etiketlenmezse Sizin Profil Afişinizi Görüntülenir",
    category:"general",
    execute(interaction) {

        const { embed } = interaction.client

        const target = interaction?.options.getUser("kullanıcı")
        const boyut = interaction.options.getString("boyut") || 300

        if(target){
            target.fetch().then(user => {

                const avatar = new MessageEmbed()
                .setTitle(`${user.username} Adlı Kullanıcının Profil Afişi`)
                .setImage(user.bannerURL({size:Number(boyut)}))
                .setColor("BLURPLE")

                const btn = new MessageActionRow()
                .addComponents(
                new MessageButton()
                .setStyle("LINK")
                .setURL(user.bannerURL({format:"png",size:Number(boyut)}))
                .setLabel("PNG"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(user.bannerURL({format:"webp",size:Number(boyut)}))
                .setLabel("WEBP"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(user.bannerURL({format:"jpg",size:Number(boyut)}))
                .setLabel("JPG"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(user.bannerURL({format:"jpeg",size:Number(boyut)}))
                .setLabel("JPEG"),
                )

                return interaction.reply({embeds:[avatar],components:[btn]})
           
            }).catch(() => {
                return interaction.reply({embeds:[embed("",`${target} Adlı Kullanıcının Bir Profil Afişi Bulunmamaktadır`,"RED")]})
            })

            
            
        }else{

            interaction.user.fetch().then(user => {

                const avatar = new MessageEmbed()
                .setTitle(`${user.username} Adlı Kullanıcının Profil Afişi`)
                .setImage(user.bannerURL({size:Number(boyut)}))
                .setColor("BLURPLE")

                const btn = new MessageActionRow()
                .addComponents(
                new MessageButton()
                .setStyle("LINK")
                .setURL(user.bannerURL({format:"png",size:Number(boyut)}))
                .setLabel("PNG"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(user.bannerURL({format:"webp",size:Number(boyut)}))
                .setLabel("WEBP"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(user.bannerURL({format:"jpg",size:Number(boyut)}))
                .setLabel("JPG"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(user.bannerURL({format:"jpeg",size:Number(boyut)}))
                .setLabel("JPEG"),
                )

                interaction.reply({embeds:[avatar],components:[btn]})
            }).catch(() => {
                return interaction.reply({embeds:[embed("",`${interaction.user} Adlı Kullanıcının Bir Profil Afişi Bulunmamaktadır`,"RED")]})
            })

            
        }
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    .addUserOption(option => 
        option.setName("kullanıcı")
        .setDescription("Etiketlenen Kullanıcının Avatarı Görüntülenir")
        )
    .addStringOption(opt => 
        opt.setName("boyut")
        .setDescription("Profil Afişinin Boyutunu Ayarlarsınız")
        .addChoices(
            {name:"16",value:"16"},
            {name:"32",value:"32"},
            {name:"64",value:"64"},
            {name:"128",value:"128"},
            {name:"256",value:"256"},
            {name:"512",value:"512"},
            {name:"1024",value:"1024"},
            {name:"2048",value:"2048"},
            {name:"4096",value:"4096"}
        )
        )
    module.exports = { data, slash_data }