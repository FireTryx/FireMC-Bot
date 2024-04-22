const Discord = require("discord.js")

module.exports = {

    name: "convocation",
    description: "Convoquer un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "<:moderation:1043549152228945992> Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à convoquer",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison de la convocation",
            required: false,
            autocomplete: false
        }, {
        type: "string",
        name: "date",
        description: "La date de la convocation",
        required: false,
        autocomplete: false
    }
    ],
    async run(bot, message, args) {
        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Pas de membre à convoc !")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie.";

            let date = args.getString("date")
            if(!date) date = "Pas de date fournie.";

            try {            
            let embed = new Discord.EmbedBuilder()
                .setDescription(`**Vous avez été convoqué !**
                **Auteur** : __${message.user.tag}__
                **Raison** : \`${reason}\`
                **Date** : \`${date}\``)
                .setColor(bot.color)
                .setImage(bot.user.displayAvatarURL({dynamic: true}))
                .setThumbnail(user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
    
            user.send({embeds: [embed]})} catch(err) {}

            let SuccesEmbedBot = new Discord.EmbedBuilder()
            .setTitle("Convocation")
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setDescription(`**${message.user} a convoqué ${user} **
            **Raison** : \`${reason}\` 
            **Date** : \`${date}\``)
            .setColor(bot.color)
            .setTimestamp()

            message.channel.send({ embeds: [SuccesEmbedBot]})
            await message.reply({content: "Convocation envoyé avec succès !", ephemeral: true})


        } catch (err) {

            return message.reply("Erreur")
        }
    }
}