const db = require("orio.db");
const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
  
  client.on("guildCreate",async guild => {
    
  let user = await guild.fetchOwner()
  const s = new MessageEmbed()
  .setColor("BLURPLE")
  .setAuthor({name:`Bot Bir Sunucuya Katıldı`})
  .addField("Sunucunun Adı",`${guild.name}`,true)
  .addField("Sunucunun Sahibi",`[${user.user.tag}](https://www.discord.com/users/${user.id})(${user.id})`,true)
  .addField("Üye Sayısı",`${guild.memberCount}`,true)
  .setFooter({text:`Sunucu ID・${guild.id}`})
  client.channels.cache.get("982870581970087986").send({embeds:[s]})
})

client.on("guildDelete",async guild => {
    let user = await guild.fetchOwner()
    
  db.all().forEach(i => {
    if(i.ID.includes(`${guild.id}`)) db.delete(i.ID)
    })
  
  
  const s = new MessageEmbed()
  .setColor("RED")
  .setAuthor({name:`Bot Bir Sunucudan Ayrıldı`})
  .addField("Sunucunun Adı",`${guild.name}`,true)
  .addField("Sunucunun Sahibi",`[${user.user.tag}](https://www.discord.com/users/${user.id})(${user.id})`,true)
  .addField("Üye Sayısı",`${guild.memberCount}`,true)
  .setFooter({text:`Sunucu ID・${guild.id}`})
  client.channels.cache.get("982870581970087986").send({embeds:[s]})
})

}
