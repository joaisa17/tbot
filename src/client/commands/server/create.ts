import { Handler } from '.'
import { discordServer } from '@mongoose/schemas';

const createServer: Handler = async i => {
    const id = i.options.getString('id', true);
    const port = i.options.getInteger('port', true);
    const guildId = i.guildId;

    const version = i.options.getString('version') || process.env.DEFAULT_VERSION as string;
    const password = i.options.getString('password') || undefined;

    const all = await discordServer.find();

    let idMatch: boolean = false;
    let portMatch: boolean = false;

    all.forEach(server => {
        if (server.servers.some(s => s.id === id)) idMatch = true;
        if (server.servers.some(s => s.port === port)) portMatch = true;
    });

    if (idMatch) {
        i.reply({
            content: 'A server is already using the id!',
            ephemeral: true
        });

        return;
    }

    if (portMatch) {
        i.reply({
            content: 'A server is already using the port!',
            ephemeral: true
        });

        return;
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

    i.reply({
        content: `Successfully created a new server! run \`/start ${id}\` to launch the server.`,
        ephemeral: true
    });
};

export default createServer;