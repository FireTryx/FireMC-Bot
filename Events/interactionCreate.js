const Discord = require("discord.js")
const { EmbedBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js")
const votedMembers = new Set();
const transcript = require("discord-html-transcripts");
const ownerId = ["850027307401740350", "891332897787756574"];

module.exports = async (bot, interaction, message, db) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
       
        let entry = interaction.options.getFocused()

        if(interaction.commandName === "help") {
           
          const cmds = bot.commands.filter(cmd => cmd.name.startsWith(entry));
          await interaction.respond(cmds.map(cmd => ({name: cmd.name, value: cmd.name})).slice(0, 25));
        }

        if(interaction.commandName === "setcaptcha") {
           
            let choices = ["on", "off"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }

        if(interaction.commandName === "setstatus") {
           
            let choices = ['Listening', 'Watching', 'Playing', 'Streaming', 'Competing']
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }
    }

    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
 
        let entry = interaction.options.getFocused()
   
        if (interaction.commandName === "traduction") {
   
          let choices;
   
          const focusedOption = interaction.options.getFocused(true);
   
          if (focusedOption.name === 'langue') {
            choices = ['french', 'english', 'deutsch', 'español', 'portuguese', 'russian']
          } 
   
          let sortie = choices.filter(c => c.includes(entry))
          await interaction.respond(entry === "" ? sortie.map(c => ({ name: c, value: c })) : sortie.map(c => ({ name: c, value: c })))
        }
    }

    if (interaction.customId === "unbans") {
      if (interaction.values[0].startsWith("users_")) {
        const id = interaction.values[0].slice(interaction.values[0].lastIndexOf('_') + 1);
          const user = await bot.users.fetch(id);
          try {
            const messagewarnuser = new Discord.EmbedBuilder()
                .setTitle(`INFORMATION DE DÉBANNISSEMENT`)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`**Vous avez été débanni d'un serveur**\nL'administrateur : **${interaction.user.tag}**\nLe Serveur : **${interaction.guild.name}**\nDate : <t:${Math.floor(Date.now() / 1000)}:F>`)
                .setTimestamp()
                .setColor("#FF0000")
                .setFooter({ text: `${bot.user.username}` });
            await user.send({ embeds: [messagewarnuser] });
          } catch (error) {
          }
          const messagewarnuadmin = new Discord.EmbedBuilder()
              .setTitle(`INFORMATION DE DÉBANNISSEMENT`)
              .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
              .setDescription(`L'administrateur : **${interaction.user.tag}**\nLe Membre : **${user.tag}**\nDate : <t:${Math.floor(Date.now() / 1000)}:F>`)
              .setTimestamp()
              .setColor("#FF0000")
              .setFooter({ text: `${bot.user.username}` });
          await interaction.reply({ embeds: [messagewarnuadmin]});
          await interaction.guild.members.unban(id);
        }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {
    
      bot.db.query(`SELECT * FROM blacklisted_users WHERE user_id = ${interaction.user.id}`, async (err, req) => {
        if(req.length >= 1) {

          const reason = req[0].reason
          return await interaction.reply({content: `Vous êtes blacklisté du bot pour la raison : \`${reason}\`\n Si vous pensez que c'est une erreur, veuillez créer un ticket !`, ephemeral: true})
        } else {

          let command = require(`../Commandes/${interaction.commandName}`)
          if (command.ownerOnly && !ownerId.includes(interaction.user.id)) return await interaction.reply({content: 'Seul les gens faisant parti de la liste peuvent exécuter cette commande!', ephemeral: true});
          await command.run(bot, interaction, interaction.options, bot.db)
        }
      })
    }

    if(interaction.isButton()) {

      // TICKETS

      if(interaction.customId === "ticket") {
   
        const ticket = new Discord.ModalBuilder()
        .setCustomId('ticket')
        .setTitle("Création d'un ticket")
   
        const Sujet = new Discord.TextInputBuilder()
        .setCustomId('sujet')
        .setLabel("Quel est le sujet de votre ticket ?")
        .setRequired(true)
        .setStyle(Discord.TextInputStyle.Short)
   
        const Probleme = new Discord.TextInputBuilder()
        .setCustomId('probleme')
        .setLabel("Quel est le problème ?")
        .setRequired(true)
        .setStyle(Discord.TextInputStyle.Paragraph)
   
        const Sujet01 = new Discord.ActionRowBuilder().addComponents(Sujet);
        const Probleme01 = new Discord.ActionRowBuilder().addComponents(Probleme);
   
        ticket.addComponents(Sujet01, Probleme01);
        await interaction.showModal(ticket)
   
        const reponse = await interaction.awaitModalSubmit({time: 300000})
   
        const Sujet02 = reponse.fields.getTextInputValue('sujet')
        const Probleme02 = reponse.fields.getTextInputValue('probleme')
   
        const Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle("Ticket")
        .setDescription(`**Sujet :** ${Sujet02}\n**Problème** :${Probleme02}`)
        .setFooter({ text: `Ticket de ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
   
        const Button = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId(`closeticket`)
        .setLabel(`Fermer`)
        .setStyle(Discord.ButtonStyle.Danger),
        new Discord.ButtonBuilder()
        .setCustomId(`claim`)
        .setLabel(`Claim le ticket`)
        .setStyle(Discord.ButtonStyle.Success),
        new Discord.ButtonBuilder()
        .setCustomId(`transcripts`)
        .setLabel(`Sauvegarder`)
        .setStyle(Discord.ButtonStyle.Primary));

        interaction.guild.channels.create({
          name: `ticket-${interaction.user.username}`,
          type: Discord.ChannelType.GuildText,
          topic: `Ticket de ${interaction.user.username} / ID de l'utilisateur: ${interaction.user.id}`,
          parent: "1176973501618471014",
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: [Discord.PermissionFlagsBits.ViewChannel],
            },  
            {
              id: interaction.user.id,
              allow: [Discord.PermissionFlagsBits.ViewChannel],
            },
            {
              id: interaction.guild.roles.cache.get("1174780405006737469"),
              allow: [Discord.PermissionFlagsBits.ViewChannel]
            },
            {
              id: interaction.guild.roles.cache.get("1174780240904585216"),
              allow: [Discord.PermissionFlagsBits.ViewChannel]
            },
            {
              id: interaction.guild.roles.cache.get("1174777988584308757"),
              allow: [Discord.PermissionFlagsBits.ViewChannel]
            },
            {
              id: interaction.guild.roles.cache.get("1174778611031625860"),
              allow: [Discord.PermissionFlagsBits.ViewChannel]
            },
          ],
        }).then((c) => { 
          
          c.send({content: `<@&1228094234603819058>\n\nBonjour ${interaction.user}, le staff va vous répondre dans les plus brefs délais !`, embeds: [Embed], components: [Button]})
          reponse.reply({content: `Votre ticket a été créé avec succès. ${c}`, ephemeral: true})

        })  
      }


      else if(interaction.customId === "closeticket") {
   
        const ticketclose = new Discord.ModalBuilder()
        .setCustomId('ticketclose')
        .setTitle("Cloture d'un Ticket")
    
        const reason01 = new Discord.TextInputBuilder()
        .setCustomId('raison')
        .setLabel("Pourquoi voulez-vous fermer le ticket ?")
        .setRequired(true)
        .setStyle(Discord.TextInputStyle.Short)
    
        const reason02 = new Discord.ActionRowBuilder().addComponents(reason01);

        const topic = interaction.channel.topic; // Récupère l'ID de l'utilisateur-créateur du ticket
        
        const userIdRegex = /ID de l'utilisateur: (\d+)/;
        const match = topic.match(userIdRegex);

        const userId = match[1];

        const user = bot.users.cache.get(userId);
    
        if(user !== interaction.user && !(interaction.member.roles.cache.has('1228094234603819058') || interaction.member.roles.cache.has('1174777988584308757') || interaction.member.roles.cache.has('1174777685008986282'))) {
          
          await interaction.reply({ content: `Vous n'avez pas la permission requise pour fermer le ticket`, ephemeral: true });
          return;
      }

        ticketclose.addComponents(reason02);
        await interaction.showModal(ticketclose)

        const reponse = await interaction.awaitModalSubmit({time: 300000})
        const reason03 = reponse.fields.getTextInputValue('raison');
        await reponse.reply({content: `Votre ticket a été fermé avec succès.`, ephemeral: true})
        await interaction.channel.send(`Le ticket de ${user} a été fermé par ${interaction.user}\n\nRaison: ${reason03}`)

        const EmbedTranscript = new Discord.EmbedBuilder()
          .setColor(bot.color)
          .setDescription(`Transcript : **${interaction.channel.name}**`)

        try { await bot.users.cache.get(userId).send({embeds: [EmbedTranscript], files: [await transcript.createTranscript(interaction.channel)], content: `**Votre ticket à été fermé par **${interaction.user}**.**\n**Raison: **${reason03}`}) } catch {}

        const transcripts_channel = bot.channels.cache.get("1226642113949597738");

        await transcripts_channel.send( {embeds: [EmbedTranscript], files: [await transcript.createTranscript(interaction.channel)]})
        await interaction.channel.delete();

      } 

      else if(interaction.customId === "claim") {
   
        const claim_channel = interaction.channel;

        //##############################################//
        //                     TODO                     //
        //##############################################//
        //                                              //
        //    Role verification to claim the ticket     //
        //                                              //
        //##############################################//
        //                                              //
        //##############################################//


        const topic = interaction.channel.topic; // Récupère l'ID de l'utilisateur-créateur du ticket
      
        const userIdRegex = /ID de l'utilisateur: (\d+)/;
        const match = topic.match(userIdRegex);

        const userId = match[1];

        const user = bot.users.cache.get(userId);

        if(!(interaction.member.roles.cache.has('1228094234603819058') || interaction.member.roles.cache.has('1174777988584308757') || interaction.member.roles.cache.has('1174777685008986282'))) return interaction.reply({content: `Vous n'avez pas la permission requise pour claim le ticket`, ephemeral: true});

        await interaction.reply({content: `Vous avez claim le ticket.`, ephemeral: true})
        claim_channel.send(`${interaction.user} a claim le ticket de ${user}, il va donc vous prendre en charge`)

      }

      else if(interaction.customId === "transcripts") {
   
        const EmbedTranscript = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setDescription(`Transcript : **${interaction.channel.name}**`)
   
        const EmbedPermissionTranscript = new EmbedBuilder()
        .setColor(bot.color)
        .setDescription("Vous n'avez pas la permission requise !")
   
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({embeds: [EmbedPermissionTranscript], ephemeral: true})
   
        await interaction.deferReply({ ephemeral: true })
        await bot.channels.cache.get("1226642113949597738").send( {embeds: [EmbedTranscript], files: [await transcript.createTranscript(interaction.channel)]})
        await interaction.editReply({content: `Ticket enregistré avec succès par ${interaction.user}.`, ephemeral: true})
      }
    }

    if (interaction.isButton()) {
    
      const splittedArray = interaction.customId.split('-')
      if(splittedArray[0] !== "Poll") return;
      if(votedMembers.has(`${interaction.user.id}-${interaction.message.id}`))
      return interaction.reply({content: "Vous avez déjà voté", ephemeral: true})
      votedMembers.add(`${interaction.user.id}-${interaction.message.id}`)

      const pollEmbed = interaction.message.embeds[0];
      if(!pollEmbed) return interaction.reply({content: "Contacter un administrateur si vous avez un problème!", ephemeral: true});
      
      const yesField = pollEmbed.fields[0];
      const noField = pollEmbed.fields[1];

      const VoteCountedReply = "Votre vote a bien été pris en compte!"

      switch(splittedArray[1]) {
          case "Yes" : {
              const newYesCount = parseInt(yesField.value) + 1;
              yesField.value = newYesCount;

              interaction.reply({content: VoteCountedReply, ephemeral: true});
              interaction.message.edit({embeds: [pollEmbed]})
          }
          break;
          case "No" : {
              const newNoCount = parseInt(noField.value) + 1;
              noField.value = newNoCount;

              interaction.reply({content: VoteCountedReply, ephemeral: true});
              interaction.message.edit({embeds: [pollEmbed]})
          }
          break;
      }
  }
}

