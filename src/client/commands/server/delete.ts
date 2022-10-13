import { Handler } from '.';
import { discordServer } from '@mongoose/schemas';

const deleteServer: Handler = async i => {
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

    // If the server is running, stop it here (MUST BE IMPLEMENTED, OR MAY CAUSE BREAKING CHANGES)

    guild.servers.splice(serverIndex, 1);
    await guild.save();

    i.editReply(`Successfully deleted server \`${id}\`!`);
}

export default deleteServer;