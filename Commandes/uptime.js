const Discord = require("discord.js")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ApplicationCommandType, SelectMenuBuilder } = require("discord.js")

module.exports = {

    name: "uptime",
    description: "Permet de voir l'uptime du Bot",
    permission: "Aucune",
    dm: true,
    category: "<:info:1104812640481574994> Informations",

    async run(client, message, args) {

        let days = Math.floor((client.uptime / (1000 * 60 * 60 * 24)) % 60).toString();
        let hours = Math.floor((client.uptime / (1000 * 60 * 60)) % 60).toString();
        let minuts = Math.floor((client.uptime / (1000 * 60)) % 60).toString();
        let seconds = Math.floor((client.uptime / 1000) % 60).toString();

        let Embed = new Discord.EmbedBuilder()
        .setColor("#3DB2E4")
        .setTitle(":watch:‎  -  Uptime OreoFaction")
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        .setDescription("**OreoFaction Bot est demarré depuis..**")
        .setTimestamp()
        .addFields({name: `Jours : `, value: `${days}`})
        .addFields({name: `Heures : `, value: `${hours}`})
        .addFields({name: `Minutes : `, value: `${minuts}`})
        .addFields({name: `Secondes : `, value: `${seconds}`})
        .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL({ ephemeral: true})})

        await message.reply({embeds: [Embed], ephemeral: true})
    }
};