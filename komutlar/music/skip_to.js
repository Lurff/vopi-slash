const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const data = {
  name: "ilerlet",
  description: "Oynatılan Müziği Belirtilen Saniye İlerletir",
  category: "music",
  async execute(interaction) {
    const { embed } = interaction.client;

    const queue = interaction.client.distube.getQueue(interaction)
    if (!queue) return interaction.reply({embeds:[embed("","Oynatılan Bir Müzik Bulunmamaktadır","RED")]})
    
    const time = interaction.options.getNumber("süre")
    queue.seek((queue.currentTime + time))
    interaction.reply({embeds:[embed("",`Oyantılan Şarkınız **${time}** Kadar İlerletildi`,"BLURPLE")]})
    
    }
}

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description)
  .setDMPermission(false)
  .addNumberOption(option => 
    option.setName("süre")
    .setDescription("İlerletmek İstediğiniz Süreyi Yazınız")
    .setRequired(true)
    )

module.exports = { data, slash_data };
