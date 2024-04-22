const translate = require('@iamtraction/google-translate');
const Discord = require("discord.js");
 
module.exports = {
 
  name: "traduction",
  description: "Permet de tradruire du text",
  permission: "Aucune",
  dm: true,
  category: "🥳 Fun",
  options: [
    {
      type: "string",
      name: "text",
      description: "Quel est le text ?",
      required: true,
      autocomplete: false
    },
    {
      type: "string",
      name: "langue",
      description: "Quel est le language ?",
      required: true,
      autocomplete: true
    }
  ],
 
  async run(bot, message, args) {
 
      const query = args.getString("text")
      const langue = args.getString("langue")
 
      await message.deferReply()
 
     if(langue === "french") {
      const translated = await translate(query, { to: 'fr' });
     return message.followUp(`${translated.text}`)
      }
 
      if(langue === "deutsch") {
        const translated = await translate(query, { to: 'de' });
       return message.followUp(`${translated.text}`)
      }
 
      if(langue === "english") {
        const translated = await translate(query, { to: 'en' });
        return message.followUp(`${translated.text}`)
      }

      if(langue === "español") {
        const translated = await translate(query, { to: 'es' });
        return message.followUp(`${translated.text}`)
      }

      if(langue === "portuguese") {
        const translated = await translate(query, { to: 'pt' });
        return message.followUp(`${translated.text}`)
      }

      if(langue === "russian") {
        const translated = await translate(query, { to: 'ru' });
        return message.followUp(`${translated.text}`)
      }
 
      if (langue !== "fr" || langue !== "en" || langue !== "de" ||  langue !== "es" || langue !== "pt" || langue !== "ru") {
        let mauvais = new Discord.EmbedBuilder()
          .setTitle(`Langue Inconnue`)
          .setColor("#000000")
          .setDescription("Langues - Languages - Sprachen - Idiomas - Línguas - Языки : \n\n \`- Français - French - Frankreich - Francia - França - Франция\`\n\n \`- Anglais - English - Englisch - Inglés - Inglês - Английский\`\n\n \`- Allemand - German - Deutsch - Alemán - Alemão - Немецкий\`\n\n \`- Espagnol - Spanish - Spanisch - Español - Espanhol - испанский\`\n\n \`- Portugais - Portuguese - Portugués - Português - португальский\`\n\n \`- Russe - Russian - Russisch - Ruso - Russo - Русский\`")
          .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, size: 64 }))
          .setTimestamp()
          .setFooter({ text: "traduction" })
        return await message.followUp({ embeds: [mauvais] })
      }
   }
  }