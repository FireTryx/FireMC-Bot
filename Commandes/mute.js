const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "mute",
    description: "Permet de mute un membre",
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
        }, {
            type: "string",
            name: "durée",
            description: "Quel durée ?",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Por quelle raison ?",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Il n'y a pas de membre à mute !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Il n'y à pas de membre à mute !")

        let time = args.getString("durée")
        if(!time) return message.reply("Veuillez indiquer le temps du mute")
        if(isNaN(ms(time))) return message.reply("Veuillez indiquer le temps dans le bon format ! Ex: 1s, 1d ...")
        if(ms(time) > 2419200000) return message.reply("Le mute ne peut pas dépasser un mois")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie !";

        if(message.user.id === user.id) return message.reply("Tu ne peut pas te mute toi-même ! Ce n'est pas logique :man_facepalming:")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu n'as pas la permission de mute le propriétaire du serveur ! :no_entry:")
        if(!member.moderatable) return message.reply("Je n'arrive pas à mute ce membre ! :sob:")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu n'as pas l'autorisation de mute ce membre")
        if(member.isCommunicationDisabled()) return message.reply("Ce membre est déjà dans une période de mute !")

        try {await user.send(`Tu as été mute de ${message.guild.name} pendant ${time} par ${message.user} pour la raison : **${reason}**`)} catch(err) {}

            await message.reply(`${message.user} a mute ${user} pour une durée de ${time} pour la raison : ${reason}`)

            await member.timeout(ms(time), reason)

    }

}