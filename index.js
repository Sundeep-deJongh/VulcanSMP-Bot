const { Client, GatewayIntentBits, Collection, Partials } = require ('discord.js');
const dotenv = require('dotenv');
const discordModals = require('discord-modals');

const { loadEvents } = require('./handlers/eventsHandler');
const { loadCommands } = require('./handlers/commandsHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ], partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction,
    ]
});

require('dotenv').config();

discordModals(client);

client.commands = new Collection();

client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
    console.log('Succesfully logged in as ' + client.user.tag);
    loadEvents(client);
    loadCommands(client);

}).catch((error) => {
    console.log(error);
    console.error(error);
});
