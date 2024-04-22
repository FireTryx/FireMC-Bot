const Discord = require("discord.js")

module.exports = {

    name: "ban",
    description: "Ban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "<:moderation:1043549152228945992> Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre a bannir",
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

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Il n'y a pas de membre a bannir !")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie.";

            if(message.user.id === user.id) return await message.reply("N'essaie pas de te bannir ! C'est inutile")
            if((await message.guild.fetchOwner()).id === user.id) return await message.reply("Tu ne peut pas ban le propiétaire du serveur !")
            if(member && !member.bannable) return await message.reply("Je ne peux pas bannir ce membre ! Erreur 0x094 !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return await message.reply("Je ne peux pas bannir ce membre !")
            if((await message.guild.bans.fetch()).get(user.id)) return await message.reply("Ce membre est déjà banni !") 

            try {await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user} pour la raison : **\`${reason}\`**`)} catch(err) {}

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {

            
        }        
    }
}