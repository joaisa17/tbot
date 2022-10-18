import { CommandHandler } from '@customTypes';
import { discordServer } from '@mongoose/schemas';

import { terminals } from '@terraria';
import shutdownServer from '@utils/shutdown';

import CommandError from '@utils/commandError';

interface Options { id: string }

const stopServer: CommandHandler<Options> = async i => {
    await i.deferReply();

    const id = i.options.getString('id', true);
    const guildId = i.guildId;
    
    const guild = await (await discordServer.findOne({ guildId }))?.toJSON();

    const server = guild?.servers.find(s => s.id === id);
    if (!server) throw new CommandError(`Server \`${id}\` does not exist!`, true, 'Not found');

    const term = terminals[i.guildId]?.[id];
    if (!term) throw new CommandError(`The server has not been started`, true, 'Terminal not found');
    
    delete terminals[i.guildId];
    
    try {
        await shutdownServer(term);
    } catch(err) {
        throw new CommandError(`Failed to shut down the server: ${err}`);
    }

    i.editReply('Successfully shut down the server!');
}

stopServer.autoComplete = i => {
    i.respond(Object.keys(terminals).map(k => ({
        name: k,
        value: k
    })));
}

export default stopServer;