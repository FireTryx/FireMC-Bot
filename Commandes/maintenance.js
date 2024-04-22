const Discord = require("discord.js")

module.exports = {

    name: "maintenance",
    description: "Informer les utilisateurs du status des serveurs de jeux",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "<:minecraft:1106706965536723015> Serveurs de jeux",

    async run(bot, message, args) {

        const membres = message.guild.roles.cache.get("1041797304216195113")
        message.channel.send(`${membres}`)
        
        const embed_maintenance = new Discord.EmbedBuilder()
            .setTitle("<:booting:1047585605787336734> - Infrastructure des serveurs de jeux")
            .setDescription("L'infrastruture des serveurs de jeux à été placé dans un stade de maintenance\nNous vous informerons lors du retour des serveurs !")
            .setColor(bot.color)
            .setTimestamp()
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))

        await message.reply({embeds: [embed_maintenance]})
    }
}