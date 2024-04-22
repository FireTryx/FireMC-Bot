const { PermissionFlagsBits } = require('discord.js');
module.exports = {

    name: "unwarn",
    description: "Permet de supprimer un avertissement d'un membre",
    dm: false,
    category: "<:moderation:1043549152228945992> Modération",
    permission: PermissionFlagsBits.ManageMessages,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre dont vous voulez souhaitez supprimer l'avertissement",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "id",
            description: "ID du warn que vous voulez supprimer",
            required: true,
            autocomplete: false
        }   

    ],

    async run(client, interaction, args, db) {
        let user = await client.users.fetch(interaction.options.get('membre').value);
        if (!user) return interaction.reply('Pas de membre à avertir')
        let member = interaction.guild.members.cache.get(user.id);
        if (!member) return interaction.reply('Pas de membre à avertir')

        let id = args.get('id').value

        if (interaction.user.id === user.id) return interaction.reply('Vous ne pouvez pas supprimer vosa avertissments');
        if ((await interaction.guild.fetchOwner()).id === user.id) return interaction.reply('Vous ne pouvez supprimer les avertissements du propriétaire du serveur');
        if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return interaction.reply('Tu ne peux pas supprimer les avertissements de ce membre');
        if ((await interaction.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return interaction.reply('Le bot ne peut pas supprimer les avertissements de  ce membre');

        db.query(`SELECT * FROM warns WHERE guild = "${interaction.guild.id}" AND user = "${user.id}" AND warn = '${id}'`, async (err, req) => {
            if (req.length < 1) return interaction.reply('Aucune avertissements pour ce membre/ID du warn invalide');

           db.query(`DELETE FROM warns WHERE guild = "${interaction.guild.id}" AND user = "${user.id}" AND warn = "${id}"`)
           interaction.reply(`Vous avez supprimé un avertissement du membre ${user.tag}`)
        })

    }
}