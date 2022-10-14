import { SlashCommandBuilder, SlashCommandStringOption } from 'discord.js';
import targetId from '@utils/commandOptions/targetId';

import { portOption } from '@utils/commandOptions';
import { modifiable } from '@customTypes';

const modifyCommand = new SlashCommandBuilder()
    .setName('modify')
    .setDescription('Allows you to modify a server\'s configuration')

    .addStringOption(targetId(true))
    .addIntegerOption(portOption(false));

modifiable.forEach(name => {
    modifyCommand.addStringOption(
        new SlashCommandStringOption()
            .setName(name as string)
            .setDescription(`Change the server's ${name}`)
    );
});

export default modifyCommand;