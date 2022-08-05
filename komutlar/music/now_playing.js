const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "oynatılan",
  description: "Oynatılan Müziğin İstatistiklerini Görüntüler",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müzik Bulunmamaktadır","RED")]})
   
    const song = queue.songs[0]
    interaction.reply({embeds:[embed("",`Oynatılan Şarkı \n**${song.name}** Oynatan Kişi **${song.user}**`,"BLURPLE")]})
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)

module.exports = { data, slash_data };
