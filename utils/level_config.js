const db = require("orio.db")

module.exports = (client) => {

    client.on("messageCreate", async (message) => {
      
        if(message.author.bot === true) return; 

        const kontrol = db.fetch(`seviye_sistemi_${message.guild.id}`)
        if(!kontrol) return;
        
        let xpmesaj = db.fetch(`xp_mesaj_${message.guild.id}`)
        if(!xpmesaj) db.set(`xp_mesaj_${message.guild.id}`,1)
        
        let kontrol2 = db.fetch(`xp_${message.guild.id}_${message.author.id}`)
        db.add(`xp_${message.guild.id}_${message.author.id}`, xpmesaj)
        
        let kontrol3 = db.fetch(`xp_${message.guild.id}_${message.author.id}`)
        let xplevel = db.fetch(`xp_level_${message.guild.id}`)
        if(!xplevel) db.set(`xp_level_${message.guild.id}`,250) 
        if(kontrol3 >= xplevel){
          
        let kontrol4 = db.fetch(`lvl_${message.guild.id}_${message.author.id}`)
        
        db.add(`lvl_${message.guild.id}_${message.author.id}`,1)
        db.delete(`xp_${message.guild.id}_${message.author.id}`)
      
          let kontrol = db.fetch(`level_log_${message.guild.id}`)
          
        if(kontrol){
         client.channels.cache.get(kontrol).send(`${message.author} Tebrikler Yeni Bir Seviye Atladınız Yeni Seviyeniz ${db.fetch(`lvl_${message.guild.id}_${message.author.id}`)} :partying_face:`)
        }
      
        if(!kontrol) return;
      
        }
          
        let kontrol4 = db.fetch(`lvl_${message.guild.id}_${message.author.id}`)  
        // let seviyem = db.get(`seviye-level_${message.guild.id}`)
        // if(!seviyem) return;
        let seviyerol = db.get(`seviye-rol_${message.guild.id}`)
        if(!seviyerol) return;
            
        for (let seviye of seviyerol) {
        if (kontrol4 >= seviye.seviye) {
          
      let member = await message.guild.members.fetch(message.author.id)
      
      
      member.roles.add(seviye.rol)
      
      
        } 
      }
                  
      })
      
}
