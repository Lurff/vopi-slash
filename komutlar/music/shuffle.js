const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "karıştır",
  description: "Arattığınız Müziği Bulunduğunuz Kanalda Oynatır",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müzik Bulunmamaktadır","RED")]})
    queue.shuffle()
    interaction.reply({embeds:[embed("","Oynatma Listeniz Karıştırılmıştır","BLURPLE")]})
        
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)
  
 
module.exports = { data, slash_data };
