const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "atla",
  description: "Sırada Bulunan Müziğe Atlamanızı Sağlar",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const queue = interaction.client.distube.getQueue(message)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılam Bir Müzik Bulunmamaktadır","RED")]})
    try {
      const song = await queue.skip()
      interaction.reply({embeds:[embed("",`Şarkı Atlanmıştır Sıradaki Şarkı ${song.name}`,"BLURPLE")]})
    } catch (e) {
      interaction.reply({embeds:[embed("","Sırada Bir Şarkı Bulunamadığı İçin Şarkı Atlanamamıştır","RED")]})
    }
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false);

module.exports = { data, slash_data };
