import { Handler } from '.';
import { discordServer } from '@mongoose/schemas';

const deleteServer: Handler = async i => {
    const id = i.options.getString('id', true);

    const guild = await discordServer.findOne({ id: i.guildId });
    if (!guild) return;

    const serverIndex = guild.servers.findIndex(s => s.id === id);

    if (serverIndex <= 0) {
        i.reply({
            content: 'The server does not exist!',
            ephemeral: true
        });

        return;
    }

    // If the server is running, stop it here (MUST BE IMPLEMENTED, OR MAY CAUSE BREAKING CHANGES)

    guild.servers.splice(serverIndex, 1);
    await guild.save();

    i.reply({
        content: `Successfully deleted server \`${id}\`!`,
        ephemeral: true
    });
}

export default deleteServer;