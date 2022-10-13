import { CommandHandler } from '@customTypes';
import { discordServer } from '@mongoose/schemas';

import installVersion, { versionIsInstalled } from '@terraria/install';
import CommandError from '@utils/commandError';

interface Options {
    id: string;
    port: number;

    version?: string;
    password?: string;
}

const createServer: CommandHandler<Options> = async i => {
    const id = i.options.getString('id', true);
    const port = i.options.getInteger('port', true);
    const guildId = i.guildId;

    const version = i.options.getString('version') || process.env.DEFAULT_VERSION as string;
    const password = i.options.getString('password') || undefined;

    await i.deferReply({ ephemeral: true, fetchReply: true });

    const all = await discordServer.find();

    let idMatch: boolean = false;
    let portMatch: boolean = false;

    all.forEach(server => {
        if (server.servers.some(s => s.id === id)) idMatch = true;
        if (server.servers.some(s => s.port === port)) portMatch = true;
    });

    if (idMatch) {
        return i.editReply(
            'A server is already using the id!'
        );
    }

    if (portMatch) {
        return i.editReply(
            'A server is already using the port!'
        );
    }

    const installed = await versionIsInstalled(version);

    if (!installed) {
        await i.editReply(`Installing version ${version}...`);

        try {
            await installVersion(version);
        } catch(err) {
            throw new CommandError(err, 'Failed to fetch terraria version');
        }
    }

    const server = all.find(s => s.guildId === guildId) || await discordServer.create({ guildId });

    server.servers.push({
        id,
        port,

        ownerId: i.user.id,

        version,
        password
    });

    await server.save();

    i.editReply(`Successfully registered a new server! run \`/start ${id}\` to launch the server.`);
};

export default createServer;