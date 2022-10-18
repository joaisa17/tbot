import { SlashCommandBuilder } from 'discord.js';

import targetId from '@utils/commandOptions/targetId';

const stopCommand = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the targetted server')

    .addStringOption(targetId(true))

export default stopCommand;