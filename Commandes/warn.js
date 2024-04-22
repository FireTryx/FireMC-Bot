const Discord = require('discord.js');

module.exports = {
    name: 'warn',
    description: 'Warn un membre',
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "<:moderation:1043549152228945992> Modération",
    options: [
        {
            type: 'user',
            name: 'membre',
            description: 'Le membre à warn',
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Quelle est la raison du warn",
            required: false,
            autocomplete: false
        }
    ],
    async run(bot, message, args, db) {
        
        let user = args.getUser("membre")
        if(!user) return message.reply("Veuillez indiquer le membre à warn !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Veuillez indiquer le membre à warn !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie."

        if(message.user.id === user.id) return message.reply("N'essaie pas de te warn ! C'est inutile")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peut pas warn le propiétaire du serveur !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Je n'arrive pas à warn ce membre !")
        if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Je ne peux pas à warn ce membre !")

        try { await user.send(`${message.user} vous à warn pour la raison : **\`${reason}\`**`)} catch(err) {}

        await message.reply(`${message.user} a warn ${user} pour la raison : **\`${reason}\`**`)

        let ID = await bot.function.createId("WARN")
        db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', "${Date.now()}")`)
    }
}