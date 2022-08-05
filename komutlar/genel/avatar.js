const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

const data = {
    name:"avatar",
    description:"Kullanıcı Etiketlenirse Kullanıcının Avatarını Etiketlenmezse Sizin Avatarınız Görüntülenir",
    category:"general",
    execute(interaction) {

        const { embed } = interaction.client

        const target = interaction?.options.getMember("kullanıcı")
        const boyut = interaction?.options.getString("boyut") || 300

        if(target){
            const avatar = new MessageEmbed()
            .setTitle(`${target.displayName} Adlı Kullanıcının Avatarı`)
            .setImage(target.displayAvatarURL({size:Number(boyut)}))
            .setColor("BLURPLE")

            const btn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setStyle("LINK")
                .setURL(target.displayAvatarURL({format:"png",size:Number(boyut)}))
                .setLabel("PNG"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(target.displayAvatarURL({format:"webp",size:Number(boyut)}))
                .setLabel("WEBP"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(target.displayAvatarURL({format:"jpg",size:Number(boyut)}))
                .setLabel("JPG"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(target.displayAvatarURL({format:"jpeg",size:Number(boyut)}))
                .setLabel("JPEG"),

            )

            return interaction.reply({embeds:[avatar],components:[btn]})
        }else{
            const avatar = new MessageEmbed()
            .setTitle(`${interaction.member.displayName} Adlı Kullanıcının Avatarı`)
            .setImage(interaction.member.displayAvatarURL({size:Number(boyut)}))
            .setColor("BLURPLE")

            const btn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setStyle("LINK")
                .setURL(interaction.member.displayAvatarURL({format:"png",size:Number(boyut)}))
                .setLabel("PNG"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(interaction.member.displayAvatarURL({format:"webp",size:Number(boyut)}))
                .setLabel("WEBP"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(interaction.member.displayAvatarURL({format:"jpg",size:Number(boyut)}))
                .setLabel("JPG"),
                new MessageButton()
                .setStyle("LINK")
                .setURL(interaction.member.displayAvatarURL({format:"jpeg",size:Number(boyut)}))
                .setLabel("JPEG"),

            )

            return interaction.reply({embeds:[avatar],components:[btn]})
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
        .setDescription("Avatarın Boyutunu Ayarlarsınız")
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