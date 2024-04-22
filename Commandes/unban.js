const Discord = require("discord.js")

module.exports = {

    name: "unban",
    description: "Unban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "<:moderation:1043549152228945992> Modération",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "Le utilisateur a débannir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du débannissement",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        try {

            let user = args.getUser("utilisateur")
            if (!user) return message.reply("Il n'y a pas de membre à unban !")

            let reason = args.getString("raison")
            if (!reason) reason = "Pas de raison fournie."

            if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Cet utilisateur n'est pas dans une période de bannissement !")

            try {await user.send(`Tu as été unban par ${message.user} pour la raison : \`${reason}\` \n Voici le lien pour revenir sur le serveur: https://discord.firemc.fr/`)} catch (err) {}

            await message.reply(`${message.user} a unban ${user} pour la raison : \`${reason}\``) 

            await message.guild.members.unban(user, reason)

        } catch (err) {

            return message.reply("Il n'y a pas de membre à unban !")
        }
    }
}