import { REST, Routes } from 'discord.js';

import serverCommands from './server';
import developmentCommands from './development';

import { Command } from '@customTypes'
import chalk from 'chalk';

const commands: Command[] = [
    ...serverCommands
];

if (process.env.NODE_ENV === 'development') {
    console.log(chalk.cyan('Using development commands'));
    commands.push(...developmentCommands);
};

export const rest = new REST().setToken(process.env.TOKEN as string);

export default async function configureStructure(force?: boolean) {
    const commandsJson = commands.map(c => c.toJSON());
    
    ((process.env.NODE_ENV !== 'development') || force) && rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commandsJson }
    )
}