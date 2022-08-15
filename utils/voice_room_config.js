const db = require("orio.db")

module.exports = (client) => {
   {
  
  
    // Burası kullanıcı yazdığınız ID'li ses kanalına girince Özel Oda oluşturacak kanalın ID'si.       
 
    let kanalİsim = "🏠 -üye_name- | Özel Oda" 
    
    
    let kanalLimit = 99
   
 
     
 
   client.on("voiceStateUpdate", async (oldState, newState) => {
 
       let oldChannel = oldState.channelId
       let newChannel = newState.channelId
       let guild = newState.guild || oldState.guild    
       let member = guild.members.cache.get(newState.id || oldState.id);
 
       let kontrol = 0
       let kont = db.fetch(`channel_${guild.id}`)
  
       let kanalID = kont
       let kate = db.fetch(`category_${guild.id}`)
       let yeniKanalKategoriID = kate
       guild.channels.cache.get(kanalID) ? guild.channels.cache.get(kanalID).type === "GUILD_VOICE" ? 0 : kontrol++ : kontrol++ 
       guild.channels.cache.get(yeniKanalKategoriID) ? guild.channels.cache.get(yeniKanalKategoriID).type === "GUILD_CATEGORY" ? 0 : kontrol++ : kontrol++ 
       Number(kanalLimit) ? 0 : kontrol++
       kanalİsim ? kanalİsim.length > 59 ? kontrol++ : 0 : 0
 
       if(kontrol > 0) return;  
       if(!member) return;
 
       if (newChannel === kanalID) {
       if(oldState.member.user.bot) return;
 
        await guild.channels
         .create(kanalİsim.replace("-üye_name-", member.user.username).replace("-üye_tag-", member.user.tag), {
           type: "GUILD_VOICE",
           permissionOverwrites: [
             {
               id: member.user.id,
               allow: [],
               deny: [],
             },
             {
               id: guild.roles.everyone,
               allow: [],
               deny: [],              
             },
           ],
           userLimit: Number(kanalLimit),
           parent: yeniKanalKategoriID,
         }).then(async (x) => {
          member.voice.setChannel(x.id);
  
         db.set(`temproom_${x.id}`, member.id)
 
        })             
      } 
 
      if (!oldChannel && newChannel) { } else {
 
        let data = db.get(`temproom_${oldChannel}`)
        if(!data) return;
 
        if(oldState.channel.members.size > 0) return;
 
        oldState.channel.delete().catch(err => { })
        db.delete(`temproom_${oldChannel}`) 
 
      }
   })
 }
  
}

