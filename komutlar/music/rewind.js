const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "geri",
  description: "Oynatılan Müzikte Geri Gelmenizi Sağlar",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müzik Bulunmamakta","RED")]})
    
    const time = interaction.options.getNumber("süre")
    queue.seek((queue.currentTime - time))
    interaction.reply({embeds:[embed("",`Şarkı **${time}** Süre Kadar Geri Alındı`,"BLURPLE")]})
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)
  .addNumberOption(option => 
    option.setName("süre")
    .setDescription("Geri Gelmek İstediğiniz Süreyi Yazınız")
    .setRequired(true)
    )

module.exports = { data, slash_data };
