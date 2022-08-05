const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  Modal,
  TextInputComponent
} = require("discord.js");

const data = {
  name: "öneri",
  description:
    "Bot Hakkındaki Öneri Veya Bildirilerinizi Geliştirici Ekibine Bildirirsiniz",
  category: "bot",
  execute(interaction) {
    const { client } = interaction;
    const { emoji, embed } = client;

    const modal = new Modal()
    .setCustomId("suggestion")
    .setTitle("Öneriniz")
    .setComponents(
        new MessageActionRow()
        .setComponents(
            new TextInputComponent()
            .setCustomId("title")
            .setLabel("Öneriniz")
            .setMaxLength(4000)
            .setMinLength(5)
            .setPlaceholder("Öneri Metninizi Buraya Yazınız")
            .setRequired(true)
            .setStyle("PARAGRAPH")
        )
    )

    interaction.showModal(modal)
  },
};

const slash_data = new SlashCommandBuilder()
  .setName(data.name)
  .setDescription(data.description);

module.exports = { data, slash_data };
