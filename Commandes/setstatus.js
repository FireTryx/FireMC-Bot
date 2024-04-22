const Discord = require('discord.js');

module.exports = {
    name: 'setstatus',
    description: 'Set le status du bot',
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    ownerOnly: true,
    category: "<:firetryx:1229551986928517191> Créateur du Bot",
    options: [
        {
            type: 'string',
            name: 'activité',
            description: 'Quel activité voulez-vous donner au bot',
            required: true,
            autocomplete: true
        }, {
            type: 'string',
            name: 'status',
            description: 'Quel status voulez-vous donner au bot',
            required: true,
            autocomplete: false
        }, {
            type: 'string',
            name: 'url',
            description: 'Quel est l\'URL du Stream',
            required: false,
            autocomplete: false
        }
    ],
    async run(bot, message, args, db) {
        
        let activity = args.getString("activité")
        if(activity !== "Listening" && activity !== "Playing" && activity !== "Competing" && activity !== "Watching" && activity !== "Streaming") return message.reply("Veuillez saisir un status !")
        
        let status = args.getString("status")

        if(status === "Streaming" && !args.getString("url") && args.getString("url").match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/))) return message.reply("Veuillez indiquer une URL")
        await bot.user.setActivity(status, {type: Discord.ActivityType[activity], url: args.getString("url")})
    
        await message.reply(`Status mis à jour sur : \`${activity} ${status}\``)
    }
}