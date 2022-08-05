const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "önceki",
  description: "Bir Önceki Müziğe Atlamanızı Sağlar",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müzik Bulunmamaktadır","RED")]})
   
    const song = queue.previous()
    interaction.reply({embeds:[embed("",`Bir Önceki Şarkıya Dönüş Yapıldı \n${song.name}`,"BLURPLE")]})
        
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)
  
 
module.exports = { data, slash_data };
