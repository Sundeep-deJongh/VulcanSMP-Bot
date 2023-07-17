const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Bekijk de uptime van de bot.'),

    async execute(interaction, client, args) {
        try {

            let seconds = Math.floor(client.uptime / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            let days = Math.floor(hours / 24);

            seconds %= 60;
            minutes %= 60;
            hours %= 24;

            const embed = new EmbedBuilder()
                .setTitle('Uptime VulcanSMP Bot')
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(process.env.EMBED_COLOR)
                .setDescription(`**Dagen:** ${days}\n**Uren:** ${hours}\n**Minuten:** ${minutes}\n**Seconden:** ${seconds}`)
                .setFooter({
                    text: 'Aangevraagd door ' + interaction.user.username
                })
                .setTimestamp();

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });


        } catch (error) {
            console.log(error);
        };
    }
};