import { SlashCommandBuilder, SlashCommandStringOption } from 'discord.js';
import targetId from '@utils/commandOptions/targetId';

import { ITerrariaServer } from '@customTypes';
import { portOption } from '@utils/commandOptions';

export type ModifiableStringKey = keyof Omit<ITerrariaServer, 'admins'|'port'>;

export const modifiableStrings: ModifiableStringKey[] = [
    'difficulty',
    'password',
    'seed',
    'version',
    'worldname'
];

const modifyCommand = new SlashCommandBuilder()
    .setName('modify')
    .setDescription('Allows you to modify a server\'s configuration')

    .addStringOption(targetId(true))
    .addIntegerOption(portOption(false));

modifiableStrings.forEach(name => {
    modifyCommand.addStringOption(
        new SlashCommandStringOption()
            .setName(name as string)
            .setDescription(`Change the server's ${name}`)
    );
});

export default modifyCommand;