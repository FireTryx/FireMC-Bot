const Discord = require("discord.js")

module.exports = {

    name: "warnlist",
    description: "Affiche le nombre de warns d'un membre",
    permission: "Aucune",
    dm: false,
    category: "<:info:1104812640481574994> Informations",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Quel membre ?",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {
        
        let user = args.getUser("membre")
        if(!user) return message.reply("Veuillez indiquer un membre !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Veuillez indiquer un membre !")

            
            db.query(`SELECT * FROM warns WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {
                try {
                    if(req.length < 1) return message.reply(`Le casier de ${user} est vide :=)`)
                    await req.sort((a, b) => parseInt(a.date) - parseInt(b.date))
                } catch (err) {
                    await message.reply("La Base de Données de la Shard-1 n'est pas connectée !")
                    return false
                }
                
                let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Warns de ${user}`)
                .setThumbnail(user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                .setFooter({text: "Warns"})

                for(let i = 0; i < req.length; i++) {
                    
                    Embed.addFields([{name: `Warn n°${i+1}`, value: `> **Modérateur** : ${(await bot.users.fetch(req[i].author)).user}\n> **ID Utilisateur** : ${user.id}\n> **ID** : \`${req[i].warn}\`\n> **Raison** : \`${req[i].reason}\`\n> **Date** <t:${Math.floor(parseInt(req[i].date / 1000))}>`}])
                }

            await message.reply({embeds: [Embed]})
        })
    }
}