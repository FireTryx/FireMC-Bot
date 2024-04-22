const Discord = require("discord.js")

module.exports = {
    
    name: "kick",
    description: "Kick un membre",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "<:moderation:1043549152228945992> Modération",
    options: [
        {
            name: "membre",
            type: "user",
            description: "Quel est le membre à kick ?",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du bannissement",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
            
            let user = args.getUser("membre")
            if(!user) return message.reply("Il n'y a pas de membre à kick !");
            let member = message.guild.members.cache.get(user.id);
            if(!member) return message.reply("Il n'y a pas de membre à kick !");
            
            
            let reason = args.getString("raison");
            if(!reason) reason = "Pas de raison fournie !";

            try { if(message.user.id === user.id) { 
                return message.reply("Tu ne peut pas te kick toi même");
                }
            } catch(err) {}

            try {
            if((await message.guild.fetchOwner()).id === user.id) {
                message.reply("Tu ne peut pas kick le propriétaire du serveur, sans lui, ce serveur n'existerai pas");
                }
            } catch(err) {}
            
            if(member && !member?.kickable) {
                message.reply("Je rencontre un problème, je n'arrive pas à kick ce membre! Erreur 0x094");
            }

            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
                message.reply("Tu n'as pas l'autorisation de kick ce membre");
            }

            try {await user.send(`**Tu as été kick de ${message.guild.name} par ${message.user.tag} pour la raison : ${reason}**`)} catch(err) {}

            await message.reply(`${message.user.tag} a kick ${user.tag} pour la raison : ${reason}`)

            await member.kick(reason)
    }
}
