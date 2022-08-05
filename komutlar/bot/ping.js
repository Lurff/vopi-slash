const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

const moment = require('moment')
require('moment-duration-format');
const os = require('os');

const data = {
    name:"ping",
    description:"Botun Pingini Gösterir",
    execute(interaction) {

        const { client } = interaction
        const { emoji } = client

        const dizi = []
        client.guilds.cache.find((item, i) => {
          dizi.push(item.memberCount)
        })
        var toplam = 0
        for (var i = 0; i < dizi.length; i++) {
          if (isNaN(dizi[i])) {
              continue;
          }

          toplam += Number(dizi[i])
        }

        const kec = new MessageEmbed()
        .setTitle('Vopi Bot İstatistikleri')
        .setColor('BLURPLE')
        .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
        .addField(`${emoji("developer")} Geliştrici`,`<@855806249080848414>`,true)
        .addField(`${emoji("users")} Kullanıcı Sayısı`,`${toplam}`, true)
        .addField(`${emoji("server")} Sunucu Sayısı`, `${client.guilds.cache.size}`, true)
        .addField(`${emoji("latency")} Ping`,`${client.ws.ping} ms`,true)
        .addField(`${emoji("date")} Çalışma Süresi`, `<t:${parseInt(Date.now() / 1000 - client.uptime / 1000)}:R>`, true)
        .addField(`${emoji("ram")} Ram Kullanımı`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)} MB`, true)
        .addField(`${emoji("computer")} CPU`, `${`\`\`\`${os.cpus().map(i => i.model)[0]}\`\`\``}`)
        return interaction.reply({embeds:[kec]})
    }
}

const slash_data = new SlashCommandBuilder() 
    .setName(data.name)
    .setDescription(data.description)
    
    module.exports = { data, slash_data }