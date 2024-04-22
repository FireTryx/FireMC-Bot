const Discord = require("discord.js")

module.exports = {
    name: "lock",
    description: "Permet de fermer un channel",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    category: "<:moderation:1043549152228945992> Modération",
    options: [
        {
            type: "channel",
            name: "salon",
            description: "Quel salon ?",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Pour quelle raison ?",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
        let channel = args.getChannel("salon")
        let c = message.guild.channels.cache.get(channel.id)
        if(!channel) return message.reply(`**Le salon n'a pas été trouvé**`)
        if(!c) return message.reply(`**Le salon n'a pas été trouvé**`)
        let reason = args.getString('raison')
        if(!reason) reason = "Pas de raison fournie"

        c.permissionOverwrites.create(message.guild.roles.cache.get("1174776379846443099"), {
            SendMessages: false,
            ReadMessageHistory: false,
            ViewChannel: true,
        })

        message.reply({ content: `**Le channnel ${channel} a été lock avec succès !**`, ephemeral: true })
        c.send(`**Ce channel a été lock par \`${message.user.username}\` pour la raison \`${reason}\`**`)

        Discord.PermissionFlagsBits.ReadMessageHistory
    }
}