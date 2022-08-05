const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "liste",
  description: "Oynatma Listesi Görüntülenir",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müzik Bulunmamaktadır","RED")]})
   
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Oynatılıyor' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    interaction.reply({embeds:[embed("",`**Sunucu Liste** \n${q}`,"BLURPLE")]})
        
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)
  
 
module.exports = { data, slash_data };
