const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const moment = require("moment")
const dotenv = require("dotenv")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Bekijk de bot informatie'),


    async execute(interaction) {

        let totalSeconds = (interaction.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);

        totalSeconds %= 86400;

        let hours = Math.floor(totalSeconds / 3600);

        totalSeconds %= 3600;

        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days}d ${hours}u ${minutes}m ${seconds}s`;

        let embed = new EmbedBuilder() 
        .setAuthor({ name: "Bot informatie", iconURL: process.env.BOT_LOGO})
        .setThumbnail(process.env.BOT_LOGO)
        .setDescription(`
            **Naam:** *${interaction.client.user.username}*
            **ID:** *${interaction.client.user.id}*
            **Uptime:** *${uptime}*
            **Gemaakt op:** *${moment(interaction.user.createdAt).format("DD-MM-YYYY")}*
            **Servers:** *${interaction.client.guilds.cache.size}*
            **Ram gebruik:** *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB*
            **CPU gebruik:** *${(process.cpuUsage().system / 1024 / 1024).toFixed(2)} MB*
            **Node versie:** *${process.version}*
            **Discord.js versie:** *${require("discord.js").version}*
            **Besturingssysteem:** *${process.platform}*
        `)
        .setColor(process.env.EMBED_COLOR)
        .setFooter({ text: `Aangevraagd door ${interaction.user.username}` })
        .setTimestamp();
    
        await interaction.reply({ embeds: [embed], ephemeral: true });

    }
};