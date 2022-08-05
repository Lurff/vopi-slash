const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "ses",
  description: "Botun Ses Ayarlarını Ayarlarsınız",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müzik Bulunmamaktadır","RED")]})
    const volume = interaction.options.getInteger("ses")
    queue.setVolume(volume)
    interaction.reply({embeds:[embed("",`Ses Seviyesi **%${volume}** Olarak Ayarlandı`,"BLURPLE")]})
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)
  .addIntegerOption(option => 
    option.setName("ses")
    .setDescription("Botun Sunucunuzdaki Ses Seviyesini Ayarlar")
    .setRequired(true)
    )

module.exports = { data, slash_data };
