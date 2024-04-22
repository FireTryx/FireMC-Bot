const Discord = require("discord.js")
const ms = module.require("ms");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    
    name: "hack",
    description: "Permet de hack quelqu'un",
    permission: "Aucune",
    dm: false,
    category: "🥳 Fun",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "L'utilisateur a hack",
            required: true,
        }
    ],

    async run(bot, interaction, args, member) {
        let caracteres = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
        let ID = [];
        let user = args.getUser("utilisateur")
        const amount = Math.floor(Math.random() * 1000000000000000) + 1;
        for(let i = 0; i < 10; i++) ID.push(caracteres[Math.floor(Math.random() * caracteres.length)])
        let msg = await interaction.reply(`**Hack sur <@${user.id}> en cours ....**`);
    
        let time = "1s";
        setTimeout(function () {
          interaction.editReply(`**Découverte du mail et mot de passe de** <@${user.id}> .....`);
        }, ms(time));
    
        let time1 = "6s";
        setTimeout(function () {
          interaction.editReply(`**Mail de : ${ID.join("")}@gmail.com \n Mode passe: ${amount} **`);
        }, ms(time1));
    
        let time2 = "9s";
        setTimeout(function () {
          interaction.editReply("**Nous cherchons d'autres comptes .....**");
        }, ms(time2));
    
        let time3 = "15s";
        setTimeout(function () {
          interaction.editReply("**Configuration du compte Epic Games .....**");
        }, ms(time3));
    
        let time4 = "21s";
        setTimeout(function () {
          interaction.editReply("** Hack Compte Epic Games......**");
        }, ms(time4));
    
        let time5 = "28s";
        setTimeout(function () {
          interaction.editReply("**Compte Epic Games piraté !!**");
        }, ms(time5));
    
        let time6 = "31s";
        setTimeout(function () {
          interaction.editReply("**Collecte d'infos.....**");
        }, ms(time6));
    
        let time7 = "38s";
        setTimeout(function () {
          interaction.editReply("**Transmission des données au Gouvernement...**");
        }, ms(time7));
    
        let time8 = "41s";
        setTimeout(function () {
          interaction.editReply(`**Piratage terminé de ${user} \n Mail : ${ID.join("")}@gmail.com \n Mode passe: ${amount} **`);
        }, ms(time8));

    }
}