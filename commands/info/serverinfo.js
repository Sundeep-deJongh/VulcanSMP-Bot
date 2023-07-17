const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const dotenv = require("dotenv");
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Bekijk informatie over de server.'),


    async execute(interaction) {

        let embed = new EmbedBuilder()
        .setAuthor({ name: "Server informatie", iconURL: config.default.logo })
        .setThumbnail(config.default.logo)
        .setDescription(`
            **Naam:** *${interaction.guild.name}*
            **ID:** *${interaction.guild.id}*
            **Eigenaar:** *<@${interaction.guild.ownerId}>*
            **Gemaakt op:** *${moment(interaction.guild.createdAt).format("DD-MM-YYYY")}*
            **Leden:** *${interaction.guild.memberCount}*
            **Kanalen:** *${interaction.guild.channels.cache.size}*
            **Roles:** *${interaction.guild.roles.cache.size}*
        `)
        .setColor(process.env.EMBED_COLOR)
        .setFooter({ text: `Aangevraagd door ${interaction.user.username}` })
        .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });

    }
}
