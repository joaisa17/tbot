import { CommandHandler } from '@customTypes';
import { discordServer } from '@mongoose/schemas';

import { terminals } from '@terraria';
import CommandError from '@utils/commandError';

import shutdownServer from '@utils/shutdown';

interface Options { id: string }

const deleteServer: CommandHandler<Options> = async i => {
    await i.deferReply({ ephemeral: true });

    const id = i.options.getString('id', true);
    const guildId = i.guildId;

    const guild = await discordServer.findOne({ guildId });
    if (!guild) return;

    const serverIndex = guild.servers.findIndex(s => s.id === id);

    if (serverIndex < 0) throw new CommandError('The server does not exist!', true, 'Not found');

    // If the server is running, stop it
    const term = terminals[i.guildId]?.[id];
    
    if (term) {
        delete terminals[i.guildId];
        await i.editReply('Shutting down the server...');
        
        try {
            await shutdownServer(term);
        } catch(err) {
            throw new CommandError(`Failed to shut down the server: ${err}`);
        }
    }
    
    guild.servers.splice(serverIndex, 1);
    await guild.save();

    i.editReply(`Successfully deleted server \`${id}\`!`);
}

deleteServer.autoComplete = (i, server) => {
    i.respond(server.servers.map(s => ({
        name: s.id,
        value: s.id
    })));
}

export default deleteServer;