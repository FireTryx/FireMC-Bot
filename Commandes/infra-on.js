const Discord = require("discord.js")

module.exports = {

    name: "infra-on",
    description: "Informer les utilisateurs du status des serveurs de jeux",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "<:minecraft:1106706965536723015> Serveurs de jeux",

    async run(bot, message, args) {


            const embed_on = new Discord.EmbedBuilder()
                .setTitle("<:finishingboot:1047585623189508167> - Infrastructure des serveurs de jeux")
                .setDescription("L'infrastruture des serveurs de jeux à été lancée et disponible\nConnectez-vous maintenant !")
                .setColor(bot.color)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))

            message.reply({embeds: [embed_on]})
    }
}