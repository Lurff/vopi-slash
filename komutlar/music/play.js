const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "oynat",
  description: "Arattığınız Müziği Bulunduğunuz Kanalda Oynatır",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply({embeds:[embed("","Müzik Dinlemek İçin Bir Ses Kanalında Bulunmalısınız","RED")]})
        if (!interaction.guild.me.permissionsIn(channel).has(["CONNECT","SPEAK"])) return interaction.reply({embeds:[embed("","Kanala Katılmak İçin `Bağlan` Ve `Konuş` İzinleri Bulunmamakta","RED")]});

        const string = interaction.options.getString("müzik")

        const options = {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
        }

       interaction.reply({embeds:[embed("","Şarkınız Yükleniyor","BLURPLE")]})

       await interaction.client.distube.play(interaction.member.voice.channel, string, options)
        
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)
  .addStringOption(option => 
    option.setName("müzik")
    .setDescription("Dinlemek İstediğiniz Müziğin İsmini Yazını")
    .setRequired(true)
    )
 
module.exports = { data, slash_data };
