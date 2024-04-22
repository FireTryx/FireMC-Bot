const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const config = require("./config.js")

bot.commands = new Discord.Collection()
bot.snipes = new Map()  

bot.color = "#a2d2ff";
bot.function = {
    createId: require("./Fonctions/createId"),
    createGiveawayId: require("./Fonctions/createGiveawayId"),
    generateCaptcha: require("./Fonctions/generateCaptcha"),
}

bot.login(config.token)

loadCommands(bot)
loadEvents(bot)

// DiscordRPC.register(clientId)

// function setActivity () {

//     if(!RPC) return;

//     RPC.setActivity({

//         state: `En cours de développement`,
//         startTimestamp: Date.now(),
//         largeImageKey: `fire_logo`,
//         instance: false,
//         buttons: [
//             {
//                 label: 'Site Internet',
//                 url: 'https://firemc.fr',
//             },
//             {
//                 label: 'Discord',
//                 url: 'https://discord.firemc.fr',
//             }
//         ]

//     });
// };

// bot.on('ready', async () => {

//     setActivity();

//     // setInterval(() => {

//     //     setActivity();
//     // }, 15 * 1000);
// });

// RPC.login({ clientId }).catch(err => console.log(err))