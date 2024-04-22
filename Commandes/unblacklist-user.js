const Discord = require ('discord.js')

module.exports = {

    name: "unblacklist-user",
    description: "Enlève l'utilisateur de la Blacklist, il pourra réutiliser les commandes",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Administration",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "Quel utilisateur ?",
            required: true,
            autocomplete: false,
        },
        {
            type: "string",
            name: "raison",
            description: "Quelle raison ?",
            required: false,
            autocomplete: false,
        },
    ],

    async run(bot, message, args, db) {

        let member = args.getUser("utilisateur")

        let reason = args.getString('raison')
        if(!reason) reason = 'Aucune raison fournie'

        try {

            // Vérification si l'utilisateur est blacklisté
            
            db.query(`SELECT * FROM blacklisted_users WHERE user_id = ${member.id}`, async (err, req) => {

                if(req.length >= 1) {           // Si oui ->

                    db.query(`DELETE FROM blacklisted_users WHERE user_id = "${member.id}"`, async (err) => {if(err){console.log(err)}})

                    await message.reply({content: `Vous avez retirer ${member} de la blacklist pour la raison : \`${reason}\`. Il pourra à nouveau utiliser les commandes du robot FireMC`, ephemeral: true})
                    await message.channel.send(`${member} a été retiré de la blacklist par ${message.user} pour la raison : \`${reason}\`. Il pourra à nouveau utiliser les commandes du robot FireMC`)

                    try { await member.send({content: `Vous avez été retiré de la blacklist par ${message.user} pour la raison : \`${reason}\`. Vous pourrez à nouveau utiliser les commandes du robot FireMC`, ephemeral: true}) } catch {}
                    
                } else {                        // Si non ->

                    await message.reply({content: `${member} ne fait pas parti de la blacklist !`, ephemeral: true})
            
                }
            })

        } catch {

            await message.reply(`Une erreur s'est produite !`)
        }
            
    }
}
