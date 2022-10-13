import { Handler } from '.'
import { discordServer } from '@mongoose/schemas';

import downloadVersion from '@terraria/download';
import extractZip from '@terraria/extract';

const createServer: Handler = async i => {
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

    try {
        await downloadVersion(version);
    } catch {
        return i.editReply(
            'Failed to fetch Terraria version! Did you type the correct version?'
        );
    }

    try {
        await extractZip(version);
    } catch(err) {
        i.editReply('Failed to extract ZIP! Please contact the developer.');
        return console.error(err);
    }

    const server = all.find(s => s.guildId === guildId) || await discordServer.create({ guildId, servers: [] });

    server.servers.push({
        id,
        port,

        ownerId: i.user.id,
        admins: [],

        version,
        password
    });

    await server.save();

    i.editReply(`Successfully registered a new server! run \`/start ${id}\` to launch the server.`);
};

export default createServer;