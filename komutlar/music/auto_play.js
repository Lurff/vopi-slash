const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "otomatik-oynat",
  description: "Otomatik Oynatmayı Açarsınız",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

   const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müziğiniz Bulunmamaktadır","RED")]})
    const autoplay = queue.toggleAutoplay() 
    interaction.reply({embeds:[embed("",`Otomatik Oynatma: \`${autoplay ? 'Açık' : 'Kapalı'}\``,"BLURPLE")]})
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)

module.exports = { data, slash_data };
