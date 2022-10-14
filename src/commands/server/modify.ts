import { CommandHandler, CommandInteraction, ITerrariaServer } from '@customTypes';
import { discordServer } from '@mongoose/schemas';

import { modifiable, ModifiableKey } from '@customTypes';

type ReturnValue = Record<ModifiableKey, string>;
function getStringOptions(i: CommandInteraction<ITerrariaServer>): ReturnValue {
    const options = <ReturnValue>{};
    
    modifiable.forEach(str => {
        const option = i.options.getString(str);
        if (option) options[str] = option;
    })

    return options;
}

const modifyCommand : CommandHandler<ITerrariaServer> = async i => {
    await i.deferReply({ ephemeral: true });

    const id = i.options.getString('id');
    const guildId = i.guildId;

    const guild = await discordServer.findOne({ guildId });
    const serverIndex = guild?.servers.findIndex(s => s.id === id) ?? -1;

    if (!guild || serverIndex < 0) return i.editReply('Server does not exist!');

    // Edit all params here
    const server = guild.servers[serverIndex];
    const options = getStringOptions(i);

    Object.keys(options).forEach((k: ModifiableKey) => {
        if (!options[k]) return;
        server[k] = options[k];
    });

    await guild.save();

    i.editReply('Successfully modified the server!');
}

modifyCommand.autoComplete = (i, server) => {
    i.respond(server.servers.map(s => ({
        name: s.id,
        value: s.id
    })));
}

export default modifyCommand;