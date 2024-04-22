const { PermissionFlagsBits, EmbedBuilder } = require("discord.js")

module.exports = {
    
    name: "snipe",
    description: "Permet d'afficher la liste des derniers messages supprimés",
    permission: PermissionFlagsBits.SendMessages,
    dm: false,
    category: 'Modération',
    
    async run(bot, interaction) {
        
        let messages = []

        interaction.guild.channels.cache.forEach(channel => {
            const channels = bot.snipes.get(channel.id);
            if (channels && channels.length > 0) {
                messages.push(...channels);
            }
        })

        if (messages.length < 1) return await interaction.reply({ content: "Aucun message supprimé récemment sur le serveur!", ephemeral: true });
        
        const embed = new EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true })})
        .setTitle(`La liste des derniers messages supprimés`)
        .setTimestamp()
        .setFooter({ text: `Demandé par : @${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})

        messages.sort((a, b) => b.createdAt - a.createdAt)

        for(let i = 0; i < messages.length; i++) {
            
            const message = messages[i];
            const content = message.attachments.size > 0 ? message.attachments.first().url : message.content;
         
            embed.addFields(
                { name : `Message n°${i + 1}`, value: `\> **Auteur** : ${message.author} \`${message.author.username}\` \`(${message.author.id})\`\n\> **Salon** : ${message.channel} \`${message.channel.name}\` \`(${message.channel.id})\`\n\> **Date** : <t:${parseInt(message.createdAt / 1000)}:F> (<t:${parseInt(message.createdAt / 1000)}:R>)\n\> **Contenu** : ${content}` }
            )
        }

        return await interaction.reply({ embeds: [embed] })
    }
}