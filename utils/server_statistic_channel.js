module.exports = client => {

    const guild = client.guilds.cache.get("976506985010847805")
    const users = guild.channels.cache.get("977176969542254592")
    const servers = guild.channels.cache.get("977176970016194601")
    const bot_ms = guild.channels.cache.get("977195196334878750")

    setInterval(() => {        
        
        users.setName("🧞・Kullanıcı: "+client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString())
        
       
        servers.setName("🔮・Sunucu Sayısı: "+client.guilds.cache.size.toLocaleString())
       
        
        bot_ms.setName("🕘・Ping: "+client.ws.ping+"ms")
     
            
        }, 120000)
 

}
