import { Client, InteractionReplyOptions } from 'discord.js';


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
        
        try {
            await command(i);
        } catch(err) {
            const res: InteractionReplyOptions = {
                content: 'Failed to run command',
                ephemeral: true
            };

            if (i.deferred) await i.editReply(res.content);
            else if (!i.replied) await i.reply(res);
            
            console.error(err);
        }
    })
}