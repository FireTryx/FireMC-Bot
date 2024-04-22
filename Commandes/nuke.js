const Discord = require("discord.js")

module.exports = {

    name: "nuke",
    description: "Recréer un salon",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    category: "<:moderation:1043549152228945992> Modération",
    options: [

        {
            type: "channel",
            name: "channel",
            description: "Quel est le salon",
            required: true,
            autocomplete: false
        }

    ],

    async run(bot, message, args) {

        try {

            const channel = message.options.getChannel("channel");

            channel.clone({ position: channel.position.rawPosition }).then(async ch => {
                ch.send({ content: `Le salon a bien été recréer.` }).then((msg) => {
                    setTimeout(() => msg.delete(), 1000)
                })
                await message.reply({ content: `J'ai bien recréer le salon ${ch}. Veuillez patienter pour la suppréssion du salon.` }).then((ch) => {
                    setTimeout(() => channel.delete(), 1000)
                })
            })

        } catch (err) {

            console.log("Une erreur dans le commande nuke", err)

        }
    }
}