const db = require("orio.db");
const fetch = require("node-fetch");
const twitch_client_id = "g2v3ag7ssz6zlpyypxkfoquwctg7e4"
const twitch_token = "ghv2s1nw93zt74rwlnseskknm6z9x6"
const { MessageEmbed } = require("discord.js");

const cache_guild = {}

module.exports = client => {
  setInterval(() => {
    client.guilds.cache.forEach(async guild => {
      
        let kontrol = db.fetch(`twitch_${guild.id}`);
            
      if(kontrol && !cache_guild[guild.id]){
        
        let kanal = db.fetch(`twitch_notification_${guild.id}`);
        if(!kanal) return;

        fetch(`https://api.twitch.tv/helix/streams?user_login=${kontrol}`, {
          method: "GET",
          headers: {
            "client-id": process.env.twitch_client_id,
            Authorization: `Bearer ${process.env.twitch_token}`,
          },
        })
          .then(response => response.json().then(res => {
              if(!res.data.length){
                if(cache_guild[guild.id]) delete cache_guild[guild.id]
                return;
              }
          
              const userName = res.data[0].user_name;
              const game = res.data[0].game_name;
              const title = res.data[0].title;
              const viewer_count = res.data[0].viewer_count;
              const thumbnail_url = res.data[0].thumbnail_url.replace("{width}", 1920).replace("{height}", 1080);


          
              const infoEmbed = new MessageEmbed()
                .setAuthor({ name: `${userName}` })
                .setTitle(`${title}`)
                .setURL(`https://twitch.tv/${kontrol}`)
                .setColor("#6441a5")
                .addField("İzleyici Sayısı", `${viewer_count}`, true)
                .addField("Oynadığı Oyun", `${game}`, true)
                .setImage(thumbnail_url);
                
                 cache_guild[guild.id] = true          
          
              client.channels.cache.get(kanal).send({embeds: [infoEmbed],content: `Hey @everyone, ${kontrol}, Şu Anda Canlı Yayında https://twitch.tv/${kontrol} Haydi Sende Katıl...`});
          
            })
          )
          .catch((e) => {
            console.log(
              "Twitch Api`de Bir Sorun Oluştu Token Değiştirmelisiniz"
            );
            console.error(e);
          });
      }
    });
  }, 120000);
};
