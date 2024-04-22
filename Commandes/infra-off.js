const Discord = require("discord.js")

module.exports = {

    name: "infra-off",
    description: "Informer les utilisateurs du status des serveurs de jeux",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "<:minecraft:1106706965536723015> Serveurs de jeux",

    async run(bot, message, args) {


            const embed_off = new Discord.EmbedBuilder()
                .setTitle("<:off:1154908285086994522> - Infrastructure des serveurs de jeux")
                .setDescription("L'infrastruture des serveurs de jeux à été arrêtée\nNous vous informerons lors du retour des serveurs !")
                .setColor(bot.color)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))

            message.reply({embeds: [embed_off]})
    }
}