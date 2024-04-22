const Discord = require("discord.js")
const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommands = require("../Loaders/loadSlashCommands")
const { ActivityType } = require("discord.js")
const config = require("../config")

module.exports = async bot => {

    bot.db = await loadDatabase()
    bot.db.connect(function (err) {
        if(err){
            console.log("Une erreur s'est produite lors du chargement de la BDD (Base de données) !")
            return process.exit();
        } 
        else{
            return console.log("La base de données est bien connectée !")
        }
    })

    await loadSlashCommands(bot)
    
    let allcommands = [];
    await bot.commands.forEach(command => allcommands.push({commandName: command.name, commandDesription: command.description}));

    console.log(`${bot.user.tag} est bien en ligne !`)
    try{bot.user.setPresence({
        status: 'DND',
        activities: [{
            name: '/help | Version 0.50.1 Bêta',
            type: ActivityType.Watching
        }]
    })

    console.log(`Le status à été réglé sur "Regarde /help | Version 0.50.1 Bêta !"`)
    } catch {
        console.log(`Une erreur s'est produite lors du démarrage du service d'activité`)
    }
}

