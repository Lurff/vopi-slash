const { MembershipScreeningFieldType } = require("discord-api-types/v9");

module.exports = client => {

    const { embed } = client
   
   client.on("interactionCreate", interaction => {
      if(!interaction.isCommand) return;
       const command = client.commands.get(interaction.commandName)
       if(!command) return;

       try{
           command.data.execute(interaction)
       }catch(e){
        console.log(e)
       }
		if(!command.data.permission) return;
       if(command.data.permission && !interaction.member.permissions.has(command.data.permission))
       return interaction.reply({embeds:[embed("",`Bu Komutu Kullanabilmek için \`${command.data.permission}\` İznine Sahip Olmalısınız`,"RED")]})
   })


}
