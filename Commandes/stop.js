const Discord = require("discord.js")

module.exports = {
    name: 'stop',
    permission: Discord.PermissionFlagsBits.Administrator,
    description: 'Permet de stopper le bot',
    ownerOnly: true,
    category: '<:firetryx:1229551986928517191> Créateur du Bot',
    dm: true,

    async run(bot, interaction) {
        await interaction.reply({ content: 'Le bot a été stoppé', ephemeral: true });
        console.log('Le bot a été stoppé');
        return process.exit();
    },
};