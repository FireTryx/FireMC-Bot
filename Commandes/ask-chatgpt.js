const { SlashCommandBuilder } = require("discord.js");
const askgpt = require('../Fonctions/askGPT');

module.exports =  {

    
    name: "ask-chatgpt",
    description: "Demander quelque chose a Chat GPT",
    permission: "Aucune",
    ownerOnly: false,
    category: 'Fun',
    dm: true,
    options: [
        {
            type: "string",
            name: "prompt",
            description: "Que voulez-vous demander à Chat-GPT ?",
            required: true,
            autocomplete: false
        },
    ],

    async run (bot, message, args) {

        let prompt = args.getString("prompt")

        await message.deferReply({ephemeral: true});

        const reply = await askgpt(prompt);

        await message.followUp({content: `${reply}`, ephemeral: true})

    } 
};