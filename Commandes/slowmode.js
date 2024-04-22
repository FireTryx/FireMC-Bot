const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "slowmode",
    description: "Applique un slowmode à un channel",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "<:moderation:1043549152228945992> Modération",
    options: [
        {
            type: "channel",
            name: "channel",
            description: "Le channel à affecter le slowmode",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "temps",
            description: "Le temps de slowmode (s pour secondes, m pour minutes, h pour heures)",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let channel = args.getChannel("channel")
        if(!channel) return message.reply("Veuillez spécifier le salon !")

        let time = args.getString("temps")
        if(!time) return message.reply("Veuillez spécifier le temps !")
        if(isNaN(ms(time))) return message.reply("Veuillez utiliser le bon format !")
        if(ms(time) > 21600000) return message.reply("Le slowmode ne peut pas durer plus de 6 heures !");

        await channel.setRateLimitPerUser(ms(time) / 1000)

        message.reply(`**${message.user}** a appliqué un slowmode de **${time}** dans le salon **${channel}**`)
        
    }
}