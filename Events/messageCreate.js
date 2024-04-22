const Discord = require("discord.js")
const { Configuration, OpenAIApi } = require("openai");

module.exports = async (bot, message) => {

    let db = bot.db;
    if(message.author.bot || message.channel.type === Discord.ChannelType.DM) return;

    db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, req) => {

        if(req.length < 1) {

            db.query(`INSERT INTO server (guild, captcha) VALUES (${message.guild.id}, 'false')`)
        }
    })

    //if(message.content === "Salut", "slt", "wsh", "wesh"){
        //message.react('👋')
    //}

    // if(message.content.match(/(salut|slt|selem|slm|bonjour|bjr|hi|holla)/i)) {
    //     message.react('👋')
    // };
}