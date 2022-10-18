import { CommandHandler } from '@customTypes';
import { discordServer } from '@mongoose/schemas';

import installVersion, { versionIsInstalled } from '@terraria/install';
import CommandError from '@utils/commandError';

import parse from '@utils/parse';

interface Options {
    id: string;
    port: number;

    version?: string;
    password?: string;
}

const createServer: CommandHandler<Options> = async i => {
    const {
        options,
        config
    } = parse(i);

    const id = i.options.getString('id', true);
    const guildId = i.guildId;
    
    const version = options.version || process.env.DEFAULT_VERSION;

    await i.deferReply({ ephemeral: true, fetchReply: true });

    const all = await discordServer.find();

    let idMatch: boolean = false;
    let portMatch: boolean = false;

    all.forEach(server => {
        if (server.servers.some(s => s.id === id)) idMatch = true;
        if (server.servers.some(s => s.config.port === config.port)) portMatch = true;
    });

    if (idMatch) throw new CommandError('A server is already using the id!', true, 'Duplicate ID');
    if (portMatch) throw new CommandError('A server is already using the port!', true, 'Duplicate Port');

    const installed = await versionIsInstalled(version);

    if (!installed) {
        await i.editReply(`Installing version ${version}...`);

        try {
            await installVersion(version);
        } catch(err) {
            throw new CommandError(`Failed to fetch terraria version: ${err}`, false, 'Version fetch');
        }
    }

    const server = all.find(s => s.guildId === guildId) || await discordServer.create({ guildId, servers: [] });

    server.servers.push({
        id,
        ownerId: i.user.id,

        version: version,
        config
    });

    await server.save();

    i.editReply(`Successfully registered a new server! run \`/start ${id}\` to launch the server.`);
};

export default createServer;