const Discord = require("discord.js")
const { EmbedBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js")
 
module.exports = {
 
  name: "say",
  description: "Je parle :p.",
  permission: Discord.PermissionFlagsBits.ManageMessages,
  category: "<:moderation:1043549152228945992> Modération",
  dm: false,
 
  async run(bot, message, args) {
 
    let Modal = new Discord.ModalBuilder()
    .setCustomId('report')
    .setTitle('OreoFaction - Say')
 
    let question1 = new Discord.TextInputBuilder()
    .setCustomId('saychat')
    .setLabel("Que dois-je dire ?!")
    .setRequired(true)
    .setPlaceholder('Indiquez la description ici')
    .setStyle(TextInputStyle.Paragraph)
  
    let ActionRow1 = new Discord.ActionRowBuilder().addComponents(question1);
 
    Modal.addComponents(ActionRow1)
 
    await message.showModal(Modal)
 
    try {

      let reponse = await message.awaitModalSubmit({time: 300000})

      let whatToSay = reponse.fields.getTextInputValue('saychat')
  
      const EmbedSay = new Discord.EmbedBuilder()
      .setColor('#ca2d2d')
      .setDescription(`<:Check1:916412616690266183> **Votre texte s'est envoyé correctement.**`)

      await message.channel.send({ content: whatToSay });
   
      await reponse.reply({embeds: [EmbedSay], ephemeral: true})

    } catch (err) { return; }
  }
}