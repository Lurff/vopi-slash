const check_commands = require("../check_commands.js")

module.exports = client => {
 
  client.once("ready", () => {
    
    console.log("Bot Hazır")
    
    client.user.setPresence({ activities:[{ name:"Slash Commands (/)" , type:"PLAYING"}] })
    check_commands(client)

  })
    
}
