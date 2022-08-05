const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "çık",
  description: "Botu Odadan Atmanızı Sağlar",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

   const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müziğiniz Bulunmamaktadır","RED")]})
    queue.stop()
    interaction.reply({embeds:[embed("","Bot Odadan Çıkış Yapmıştır","BLURPLE")]})
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)

module.exports = { data, slash_data };
