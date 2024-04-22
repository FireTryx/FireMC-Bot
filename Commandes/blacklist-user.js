const Discord = require ('discord.js')

module.exports = {

    name: "blacklist-user",
    description: "Blacklister un utilisateur, il ne pourra plus utiliser les commandes",
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

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie"

        try {

            // Vérification si l'utilisateur est déjà Blacklisté
            
            db.query(`SELECT * FROM blacklisted_users WHERE user_id = ${member.id}`, async (err, req) => {

                if(req.length >= 1) {           // Si oui ->

                    let req_reason = req[0].reason
                    await message.reply({content: `${member} est déjà blacklisté pour la raison : \`${req_reason}\``, ephemeral: true})
                    
                } else {                        // Si non ->

                    db.query(`INSERT INTO blacklisted_users (user_id, reason) VALUES (${member.id}, '${reason}')`, async (err) => {if(err){console.log(err)}})

                    await message.reply({content: `Vous avez blacklisté ${member} pour la raison : \`${reason}\`. Il ne pourra donc plus utiliser les commandes du robot FireMC`, ephemeral: true})
                    await message.channel.send(`${member} a été blacklisté par ${message.user} pour la raison : \`${reason}\`. Il ne pourra donc plus utiliser les commandes du robot FireMC`)

                    try { await member.send({content: `Vous avez été blacklisté par ${message.user} pour la raison : \`${reason}\`. Vous ne pourrez donc plus utiliser les commandes du robot FireMC`, ephemeral: true}) } catch {}
            
                }
            })

        } catch {

            await message.reply(`Une erreur s'est produite !`)
        }
            
    }
}
