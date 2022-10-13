import { Client, ChatInputCommandInteraction, AutocompleteInteraction } from 'discord.js';
import { discordServer } from '@mongoose/schemas';

import serverCommands from './server';
import developmentCommands from './development';

import CommandError, { errorReply } from '@utils/commandError';


import { CommandMap } from '@customTypes/commands';

export const commandMaps: CommandMap[] = [
    serverCommands
];

process.env.NODE_ENV === 'development' && commandMaps.push(developmentCommands);

function getHandler(i: ChatInputCommandInteraction|AutocompleteInteraction) {
    return commandMaps.find(map =>
        map.has(i.commandName)
    )?.get(i.commandName);
}

export default function configureCommands(client: Client) {
    // Command
    client.on('interactionCreate', async i => {
        if (!i.isChatInputCommand()) return;

        const handler = getHandler(i);
        if (!handler) {
            errorReply(
                'How did you do that? I\'m confused',
                i
            );

            return console.warn(`Handler for command ${i.commandName} not found`);
        };

        try {
            await handler(i);
        } catch(err) {
            const commandError = err as CommandError;
            console.error(commandError);

            errorReply(
                commandError.title? `${commandError.title}: {error}`:process.env.ERROR_TEMPLATE,
                i, err
            );
        }
    });

    // Autocomplete
    client.on('interactionCreate', async i => {
        if (!i.isAutocomplete()) return;

        const handler = getHandler(i);
        if (!handler?.autoComplete) return;

        const guildId = i.guildId;

        const server = await discordServer.findOne({ guildId });
        if (!server) return i.respond([]);

        try {
            await handler.autoComplete(i, server);
        } catch(err) {
            console.error(err);
        }
    })
}