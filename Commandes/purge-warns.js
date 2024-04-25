const Discord = require("discord.js")
const ms = require("ms")
module.exports = {

    name: "purge-warns",
    description: "Purger la table WARNS de la base de données et supprimer tous les warns existants",
    permission: Discord.PermissionFlagsBits.Administrator,
    ownerOnly: true,
    dm: false,
    category: "<:firetryx:1229551986928517191> Créateur du Bot",

    async run(bot, message, args, db) {

        try{db.query(`TRUNCATE TABLE warns`)}catch{message.reply({content: `Une erreur s'est produite`, ephemeral: true})}

        message.reply({content: `La table WARN de la base de données à été vidée avec succès !`, ephemeral: true})
    }
}