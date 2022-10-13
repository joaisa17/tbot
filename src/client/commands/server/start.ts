import { Handler } from '.';
import { discordServer } from '@mongoose/schemas';

import configureServer, { Terminal } from '@terraria';

const startServer: Handler = async i => {
    await i.deferReply();

    const id = i.options.getString('id', true);
    const guildId = i.guildId;
    
    const guild = await discordServer.findOne({ guildId });

    const server = guild?.servers.find(s => s.id === id);

    if (!server) {
        i.editReply(`Server \`${id}\` does not exist!`);
        return;
    }

    await i.editReply(`Configuring server \`${server.worldname ?? id}\`...`);
    
    let term: Terminal;

    try {
        term = await configureServer(server, guildId);
    } catch(err) {
        return i.editReply(`Failed to configure server: ${err.message ?? 'uncaught exception'}`);
    }

    const msg = await i.editReply('Starting server...');
    term.spawn();

    term.on('exit', reason => i.editReply(`Server closed: ${reason}`));

    const thread = await msg.startThread({
        name: `terraria-server-${id}`,
        autoArchiveDuration: 60,

        reason: 'Live Terraria Server'
    });

    let success: boolean = false;

    term.on('stdout', str => {
        if (!success) {
            const successMatch = str.match(/^Listening on port \d+/);
            if (successMatch) {
                success = true;
                thread.send(`Server launched! Type \`/help\` for a list of commands`);
            }
        }

        const match = str.match(/^<([^>]+)> (.*)$/);
        if (!match) return;

        const [username, msg] = match;
        thread.sendable && thread.send(`<${username}> ${msg}`);
    });
}

export default startServer;