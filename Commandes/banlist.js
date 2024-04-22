const {EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder} = require('discord.js');

const Discord = require("discord.js")

module.exports = {
    name:"banlist",
    description: "Cette commande sert à obtenir la liste de tous les bannissements de serveurs !",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [],

    async run(bot, interaction) {
        try {
            const fetchBans = await interaction.guild.bans.fetch();
          
            const ID = fetchBans.map((m) => m.user.id);
           
            if (fetchBans.size !== 0) {

                
            
                let i = 0;
                const allBans = [];
                const allBans2 = [];
                const IDArray = [];
        
                // Récupérer les raisons de bannissement pour chaque utilisateur banni
                const banReasons = fetchBans.map((m) => m.reason);
        
                for (const member of fetchBans.map((m) => m.user.tag).values()) {
                    allBans.push(`${i + 1}. ${member}`);
                    allBans2.push(member);
                    ++i;
                }
        
                for(const id of ID) {
                    IDArray.push(id);
                }
        
                const BansEmbed = new EmbedBuilder()
                    .setTitle("Ban Lists")
                    .setDescription(`> **Nombre de Ban :** \`${fetchBans.size}\`\n\`\`\`${allBans.join("\n")}\`\`\``)
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
        
              
                
                const maxOptionsPerMenu = 25;
                const totalOptions = allBans2.length;
        
                // Calculer le nombre de menus nécessaires en fonction du nombre total d'options
                const numberOfMenus = Math.ceil(totalOptions / maxOptionsPerMenu);
        
                // Créer un tableau pour stocker toutes les rangées de menus
                const rows = [];
        
                for (let menuIndex = 0; menuIndex < numberOfMenus; menuIndex++) {
                    const startIndex = menuIndex * maxOptionsPerMenu;
                    const endIndex = Math.min((menuIndex + 1) * maxOptionsPerMenu, totalOptions);
        
                    const select = new StringSelectMenuBuilder()
                        .setCustomId(`unbans`)
                        .setPlaceholder(`Déban une personne (${startIndex + 1}-${endIndex})`);
        
                    for (let i = startIndex; i < endIndex; i++) {
                        const id = IDArray[i];
                        // Utilisez la raison de bannissement correspondante pour chaque utilisateur banni
                        select.addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel(`${allBans2[i]}`)
                                .setDescription(`Raison du ban: ${banReasons[i] || 'Aucune raison spécifiée'}`)
                                .setValue(`users_${allBans2[i]}_${id}`)
                        );
                    }
        
                    const row = new ActionRowBuilder()
                        .addComponents(select);
        
                    // Ajouter la rangée à notre tableau
                    rows.push(row);
                }
        
                // Répondre à l'interaction avec toutes les rangées de menus
                await interaction.reply({ embeds: [BansEmbed], components: rows, ephemeral: true });
            } else {
                const NotBans = new EmbedBuilder()
                .setTitle("Ban Lists")
                .setDescription("Il n'y a pas de bannir sur ce serveur !")
                .setColor("Random")
                .setTimestamp()
                .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });
    
                await interaction.reply({ embeds: [NotBans], ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue lors du traitement de votre commande.', ephemeral: true });
        }
    }
    
}