import { Client } from 'discord.js';


import serverCommands, { CommandMap } from './server';

export const commandMaps: CommandMap[] = [
    serverCommands
];

export default function configureCommands(client: Client) {
    client.on('interactionCreate', async i => {
        if (!i.isChatInputCommand()) return;
        
        const cmd = i.commandName

        const command = commandMaps.find(map =>
            map.has(cmd)
        )?.get(cmd);
        
        if (!command) return;
        return await command(i);
    })
}