const { ChannelType } = require("discord.js")

module.exports = async (bot, message) => {
    
    if(message.channel.type === ChannelType.DM || message.author.bot) return;

        if (bot.snipes.get(message.channel.id)) {
            const messages = bot.snipes.get(message.channel.id)
            if (messages.length >= 10) {
                messages.shift()
            }
            messages.push(message)
            await bot.snipes.set(message.channel.id, messages)
        } else {
            await bot.snipes.set(message.channel.id, [message])
        }
}