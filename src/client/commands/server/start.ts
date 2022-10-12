import { Handler } from '.';

import { discordServer } from '@mongoose/schemas';

const startServer: Handler = async i => {
    const id = i.options.getString('id', true);
    
    const guild = await discordServer.findOne({ id: i.guildId });

    const server = guild?.servers.find(s => s.id === id);

    if (!server) {
        i.reply({
            content: `Server \`${id}\` does not exist!`,
            ephemeral: true
        });

        return;
    }

    i.reply({
        content: `Starting server \`${server.worldname ?? id}\`...`,
        ephemeral: true
    });

    i.channel?.send(`<@${i.user.id}> launched a server!`);
}

export default startServer;