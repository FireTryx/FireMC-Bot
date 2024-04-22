const Discord = require("discord.js")

module.exports = {

    name: "infra-boot",
    description: "Informer les utilisateurs du status des serveurs de jeux",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "<:minecraft:1106706965536723015> Serveurs de jeux",

    async run(bot, message, args) {


            const embed_boot = new Discord.EmbedBuilder()
                .setTitle("<:booting:1047585605787336734> - Infrastructure des serveurs de jeux")
                .setDescription("L'infrastruture des serveurs de jeux est en tain de démarrer\nNous vous informerons lorsque les serveurs sont lancés !")
                .setColor(bot.color)
                .setTimestamp()
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))

            message.reply({embeds: [embed_boot]})
    }
}