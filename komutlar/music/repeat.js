const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "tekrarla",
  description: "Şarkıyı Tekrarlatmayı Sağlar",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müzik Bulunmamaktadır","RED")]})
    
    const type = interaction.options.getString("mod")

    let mode = null
    
    if(type === "liste") mode = 2

    if(type == "şarkı") mode = 1

    if(type == "kapalı") mode = 0

    mode = queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? 'Liste Tekrar' : 'Şarkı Tekrar') : 'Kapalı'
    interaction.reply({embeds:[embed("",`Tekrar Modu ${mode} Olarak Ayarlandı`,"BLURPLE")]})
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)
  .addStringOption(option => 
    option.setName("mod")
    .setDescription("Şarkıları Tekrarlama Modunu Belirtiniz")
    .addChoices(
        {name:"Kapalı",value:"off"},
        {name:"Şarkı",value:"song"},
        {name:"Liste",value:"queue"}
    )
    .setRequired(true)
    )

module.exports = { data, slash_data };
