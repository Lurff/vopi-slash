const { MessageEmbed, MessageAttachment } = require("discord.js")
const db = require("orio.db")
const Canvas = require("canvas")

module.exports = (client) => {

    client.on("guildMemberAdd",async (member) => {

        if(member.user.bot){ 
            const bot_role = db.fetch(`bot_auto_role_${member.guild.id}`)
            if(!bot_role) return;

            member.roles.add(bot_role).then(() => {

                let log = db.fetch(`log_${member.guild.id}`)
                if(!log) return

                const Log = new MessageEmbed()
                .setTitle("Otorol Verildi")
                .setColor("#2F3136")
                .addFields([
                    {name:"Otorol Verilen Kullanıcı",value:`${member}(${member.user.bot ? "Bot" : "Kullanıcı"})`,inline: true},
                    {name:"Verilen Rol",value:`<@&${bot_role}>`,inline: true},
                    {name:"Rol Verilme Zamanı",value:`<t:${Math.floor(member.joinedTimestamp/1000)}>`,inline: true}
                ])
                .setFooter({text:`Rol Verilen Kullanıcı ID: ${member.id}`})
                .setTimestamp(member.joinedTimestamp)
                client.channels.cache.get(log).send({embeds:[Log]})
            }).catch(() => {
                return;
            })
        }
        if(!member.user.bot){

            const member_role = db.fetch(`auto_role_${member.guild.id}`)
            if(!member_role) return

            member.roles.add(member_role).then(() => {

                let log = db.fetch(`log_${member.guild.id}`)
                if(!log) return

                const Log = new MessageEmbed()
                .setTitle("Otorol Verildi")
                .setColor("#2F3136")
                .addFields([
                    {name:"Otorol Verilen Kullanıcı",value:`${member}(${member.user.bot ? "Kullanıcı" : "Bot"})`,inline: true},
                    {name:"Verilen Rol",value:`<@&${bot_role}>`,inline: true},
                    {name:"Rol Verilme Zamanı",value:`<t:${Math.floor(member.joinedTimestamp/1000)}>`,inline: true}
                ])
                .setFooter({text:`Rol Verilen Kullanıcı ID: ${member.id}`})
                .setTimestamp(member.joinedTimestamp)
                client.channels.cache.get(log).send({embeds:[Log]})
             }).catch(() => {
                return;
            })
        }

    let kontrol = db.fetch(`joined_member_channel_${member.guild.id}`)
    if(!kontrol) return;
  
    if(kontrol){
        let channel = member.guild.channels.cache.get(kontrol)

    
      const canvas = Canvas.createCanvas(1000,500)
        const ctx = canvas.getContext("2d")
    
        const bg = await Canvas.loadImage("https://cdn.glitch.global/162de739-8a55-4de4-945b-f3227f87f50c/walpaper.png?v=1651527266617")
        ctx.drawImage(bg,0,0,canvas.width,canvas.height);    
    
        //text    
        ctx.font = "40px Sans-serif";
        ctx.fillStyle = "#f0f0f0";
        ctx.fillText("Sunucuya Hoş Geldin",290,400);
        //text2
        ctx.font = "50px Sans-serif";
        ctx.fillStyle = "#f0f0f0";
        ctx.fillText(member.user.tag,canvas.width / 2.05 - (ctx.measureText(member.user.tag ).width / 2), 335);
    
        //avatar daire
        ctx.beginPath()
        ctx.arc(490,150,100,0,Math.PI * 2,true)
        ctx.closePath()
        ctx.clip()
    
        //avatar
        const avatar = await Canvas.loadImage(member.user.avatarURL({format:"jpg"}))
        ctx.drawImage(avatar,390, 50 ,200,200)
    
    
        const attachment = new MessageAttachment(canvas.toBuffer(), "wallpaper.jpg")
    
    
        channel.send({content:`<@${member.id}> Adlı Kullanıcı Suncuya Katıldı\n Sunucuya Katılma Zamanı <t:${Math.floor(member.joinedTimestamp/1000)}>`,files:[attachment]})
    }
  
      
    })
    
    client.on("guildMemberRemove", async (member) => {      
        
        let kontrol = db.fetch(`member_leaved_channel_${member.guild.id}`)
        if(!kontrol) return;
        
        if(kontrol){
          let channel = member.guild.channels.cache.get(kontrol)
          
           const canvas = Canvas.createCanvas(1000,500)
          const ctx = canvas.getContext("2d")
          
          const bg = await Canvas.loadImage("https://cdn.glitch.global/162de739-8a55-4de4-945b-f3227f87f50c/walpaper.png?v=1651527266617")
          ctx.drawImage(bg,0,0,canvas.width,canvas.height);
          
          //text    
          ctx.font = "40px Sans-serif";
          ctx.fillStyle = "#f0f0f0";
          ctx.fillText("Sunucudan Ayrıldı",320,400);
          //text2
          ctx.font = "50px Sans-serif";
          ctx.fillStyle = "#f0f0f0";
          ctx.fillText(member.user.tag,canvas.width / 2.05 - (ctx.measureText(member.user.tag ).width / 2), 335);
          
          //avatar daire
          ctx.beginPath()
          ctx.arc(490,150,100,0,Math.PI * 2,true)
          ctx.closePath()
          ctx.clip()
          
          //avatar
          const avatar = await Canvas.loadImage(member.user.avatarURL({format:"jpg"}))
          ctx.drawImage(avatar,390, 50 ,200,200)
          
          
          const attachment = new MessageAttachment(canvas.toBuffer(), "wallpaper.jpg")
          
          channel.send({content:`<@${member.id}> Adlı Kullanıcı Sunucudan Ayrıldı\n Sunucuya Katılma Zamanı <t:${Math.floor(member.joinedTimestamp/1000)}>`,files:[attachment]})
          }
        
            
      })

}
