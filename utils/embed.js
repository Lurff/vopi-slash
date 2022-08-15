const { MessageEmbed } = require("discord.js");

module.exports = (title,description,color) => {

    const response = new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    return response
}
