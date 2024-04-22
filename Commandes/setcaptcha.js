const Discord = require("discord.js")

module.exports = {

    name: "setcaptcha",
    description: "Paramètre le systeme de Captcha",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "<:parametres:1043550432854802503> Paramètrages",
    options: [
        {
            type: "string",
            name: "état",
            description: "Etat du Captcha (On où Off)",
            required: true,
            autocomplete: true
        }, {
            type: "channel",
            name: "salon",
            description: "Où souhaitez vous que le message s'envoie ?",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let etat = args.getString("état")
        if(etat !== "on" && etat !== "off") return message.reply("Veuillez indiquer l'état ! (On ou Off)")

        if(etat === "off") {

            db.query(`UPDATE server SET captcha = 'false' WHERE guild = '${message.guildId}'`)
            await message.reply("Le système de Captcha à été désactivé !")

        } else {

            let channel = args.getChannel("salon")
            if(!channel) return message.reply("Veuillez indiquer un salon dans lequel le Captcha sera envoyé !")
            channel = message.guild.channels.cache.get(channel.id)
            if(!channel) return message.reply("Aucun salon n'as été trouvé !")

            db.query(`UPDATE server SET captcha = '${channel.id}' WHERE guild = '${message.guildId}'`)
            await message.reply(`Le système de Captcha à été activé dans le salon ${channel} !`)
        }
    }
}