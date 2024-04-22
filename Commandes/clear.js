const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Supprimer un nombre de messages',
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "<:moderation:1043549152228945992> Modération",
    options: [
        {
            type: 'number',
            name: 'nombre',
            description: 'Le nombre de messages à supprimer',
            required: true,
            autocomplete: false
        }
    ],
    async run(Client, message, args) {
        let number = args.getNumber('nombre');
        if (!number) return message.reply('Veuillez indiquer un nombre de messages à supprimer !');
        if (parseInt(number) > 100) number = 100;
        if (parseInt(number) < 1) number = 1;
        
        let member = args.getUser('membre');
        let role = args.getRole('rôle');

        try {
            if (member) {
                let messages = await message.channel.bulkDelete(await message.channel.messages.fetch({ limit: parseInt(number) }).then(messages => messages.filter(m => m.author.id === member.id)));
                await message.reply({ content: `\`\`\`js\n${parseInt(messages.size)} messages ont été supprimés\`\`\``, ephemeral: true });
            } else {
                let messages = await message.channel.bulkDelete(parseInt(number));
                await message.reply({ content: `\`\`\`js\n${parseInt(messages.size)} messages ont été supprimés\`\`\``, ephemeral: true });
            }


        } catch (error) {
            console.log(error);
            await message.reply('Une erreur est survenue !');

            setTimeout(() => {
                message.deleteReply();
            }, 1000);
        }
    }
}