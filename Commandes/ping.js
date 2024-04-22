const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "ping",
    description: "Permet de connaître la latence du Bot",
    permission: "Aucune",
    ownerOnly: false,
    dm: true,
    category: "<:info:1104812640481574994> Informations",

    async run(bot, message, args) {
        
        await message.reply("Ping !")
        message.editReply(`📶Pong 🏓, La latence de l'API Discord est de ${Math.round(bot.ws.ping)}ms 🛰️\n⏪📶Dernière latence enregistrée il y a ${ms(Date.now() - bot.ws.shards.first().lastPingTimestamp, { long: true })} environ`)
    }
}