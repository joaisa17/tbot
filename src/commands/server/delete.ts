import { CommandHandler } from '@customTypes';
import { discordServer } from '@mongoose/schemas';

import { terminals } from '@terraria';

interface Options { id: string }

const deleteServer: CommandHandler<Options> = async i => {
    await i.deferReply({ ephemeral: true });

    const id = i.options.getString('id', true);
    const guildId = i.guildId;

    const guild = await discordServer.findOne({ guildId });
    if (!guild) return;

    const serverIndex = guild.servers.findIndex(s => s.id === id);

    if (serverIndex < 0) {
        i.editReply('The server does not exist!');
        return;
    }

    // If the server is running, stop it
    const term = terminals[i.guildId]?.[id];

    if (term) {
        await i.editReply('Shutting down the server...');

        await new Promise<void>((res, rej) => {
            const cleanExitListener = () => {
                term.off('cleanExit', cleanExitListener);
                res();
            };

            const exitListener = (err: any) => {
                term.off('exit', exitListener)
                rej(err);
            };

            term.on('cleanExit', cleanExitListener);
            term.on('exit', exitListener);

            term.send('exit');

            setTimeout(() => rej('Timed out'), 30000);
        });
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