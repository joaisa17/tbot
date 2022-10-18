import { CommandHandler } from '@customTypes';
import { discordServer } from '@mongoose/schemas';

import configureServer, { Terminal } from '@terraria';
import installVersion, { versionIsInstalled } from '@terraria/install';

import CommandError from '@utils/commandError';

interface Options { id: string }

const startServer: CommandHandler<Options> = async i => {
    await i.deferReply();

    const id = i.options.getString('id', true);
    const guildId = i.guildId;
    
    const guild = await (await discordServer.findOne({ guildId }))?.toJSON();

    const server = guild?.servers.find(s => s.id === id);
    if (!server) throw new CommandError(`Server \`${id}\` does not exist!`, true, 'Not found');

    const version = server.version;

    const installed = await versionIsInstalled(version);
    if (!installed) {
        await i.editReply(`Version ${version} is not installed! Installing...`);
        
        try {
            await installVersion(version);
        } catch(err) {
            throw new CommandError(err, false, 'Failed to install version');
        }
    }

    let term: Terminal;

    try {
        term = await configureServer(server, guildId);
    } catch(err) {
        throw new CommandError(err, false, 'Failed to configure server');
    }

    const msg = await i.editReply('Starting server...');
    
    let success: boolean = false;
    let isOnline: boolean = false;

    term.spawn();

    term.on('cleanExit', () => {
        isOnline = false;
        i.editReply('Server shut down');
    });

    term.on('exit', reason => {
        isOnline = false;
        i.editReply(`Server closed: ${reason}`);
    });

    const thread = await msg.startThread({
        name: `terraria-server-${id}`,
        autoArchiveDuration: 60,

        reason: 'Live Terraria Server'
    });

    async function threadListener() {
        if (success && !isOnline) return;

        const messages = await thread.awaitMessages();
        console.log(`Awaited ${messages.size} messages`);

        messages.forEach(m => {
            term.send(`say ${m.content.toString()}`);
        });
        
        threadListener();
    }

    threadListener();

    term.on('stdout', str => {
        if (!success) {
            const successMatch = str.match(/^Listening on port \d+/);
            if (successMatch) {
                success = true;
                isOnline = true;
                thread.send(`Server launched! Type \`/help\` for a list of commands`);
            }
        }

        const match = str.match(/^<([^>]+)> (.*)$/);
        if (!match) return;

        const [username, msg] = match;
        thread.sendable && thread.send(`<${username}> ${msg}`);
    });
}

startServer.autoComplete = (i, server) => {
    i.respond(server.servers.map(s => ({
        name: s.id,
        value: s.id
    })));
}

export default startServer;