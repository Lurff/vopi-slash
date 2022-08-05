const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "sürdür",
  description: "Durdurulan Müziği Devam Ettirmenizi Sağlar",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müzik Bulunmamaktadır","RED")]})
    if (queue.paused) {
      queue.resume()
      interaction.reply({embeds:[embed("","Şarkınız Devam Ettirilmektedir","BLURPLE")]})
    } else {
      interaction.reply({embeds:[embed("","Şarkınız Zaten Devam Ettirilmektedir","RED")]})
    }
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)

module.exports = { data, slash_data };
