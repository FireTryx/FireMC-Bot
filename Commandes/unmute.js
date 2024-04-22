const Discord = require("discord.js")

module.exports = {

    name: "unmute",
    description: "Permet de unmute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "<:moderation:1043549152228945992> Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Quel membre ?",
            required: true,
            autocomplete: false
        },
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Il n'y a pas de membre à unmute !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Il n'y à pas de membre à unmute !")

        if(!member.moderatable) return message.reply("Je n'arrive pas à unmute ce membre")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu n'as pas l'autorisation d'unmute ce membre")
        if(!member.isCommunicationDisabled) return message.reply("Ce membre n'est pas dans une période de mute !")

        try {await user.send(`Tu as été unmute de ${message.guild.name} :smiley:`)} catch(err) {}

        await message.reply(`${message.user.tag} a unmute ${user.tag} :smiley:`)

        await member.timeout(null)

    }

}