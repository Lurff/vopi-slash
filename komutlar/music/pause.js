const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "durdur",
  description: "Oynatılan Müziği Durdurmanızı Sağlar",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müzik Bulunmamaktadır","RED")]})
    if(queue.paused){
        return interaction.reply({embeds:[embed("","Şarkınız Zaten Durdurulmuştur","RED")]})
    }
    queue.pause()
    interaction.reply({embeds:[embed("","Şarkınız Durdurulmuştur","BLURPLE")]})
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)

module.exports = { data, slash_data };
