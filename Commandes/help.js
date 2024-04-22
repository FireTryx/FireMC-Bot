const Discord = require("discord.js")

module.exports = {

    name: "help",
    description: "Permet d'avoir de l'aide sur les commandes",
    permission: "Aucune",
    dm: true,
    category: "<:info:1104812640481574994> Informations",
    options: [
        {
            type: "string",
            name: "commande",
            description: "Quelle commande",
            required: false,
            autocomplete: true,
        }
    ],
    
    async run(bot, message, args) {


        let command;
        if(args.getString("commande")) {

            command = bot.commands.get(args.getString("commande"));
            if(!command) return message.reply({content: `Cette commande n'existe pas !`, ephemeral: true});
        }

        if(command) {

            let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Commande ${command.name}`)
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription(`\`Nom :\` ${command.name}\n\`Description :\` ${command.description}\n\`Permission\` : ${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\n\n\`Accessible en DM ?\` : ${command.dm}`)
                .setTimestamp()
                .setFooter({text: `Commande ${command.name}`})

            await message.reply({embeds: [Embed]})

        } else {

            let categories = [];
            bot.commands.forEach(command => {

                if(!categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle("Commandes du bot")
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription(`Commandes : \`${bot.commands.size}\` \n Catégories : \`${categories.length}\``)
                .setTimestamp()
                .setFooter({text: "Commande /help"})

            await categories.sort().forEach(async cat => {
                    
                let commands = bot.commands.filter((cmd => cmd.category === cat))
                Embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            })

            await message.reply({embeds: [Embed]})

        }
        
    }
}