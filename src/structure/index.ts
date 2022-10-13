import { REST, Routes } from 'discord.js';

import serverCommands from './server';
import developmentCommands from './development';

import { Command } from '@customTypes'

const commands: Command[] = [
    ...serverCommands
];

process.env.NODE_ENV === 'development' && commands.push(...developmentCommands);

export const rest = new REST().setToken(process.env.TOKEN as string);

export default async function configureStructure(force?: boolean) {
    const commandsJson = commands.map(c => c.toJSON());
    
    ((process.env.NODE_ENV !== 'development') || force) && rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commandsJson }
    )
}