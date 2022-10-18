import { SlashCommandBuilder } from 'discord.js';

import targetId from '@utils/commandOptions/targetId';

const startCommand = new SlashCommandBuilder()
    .setName('start')
    .setDescription('Launches the targetted server, and creates a thread')

    .addStringOption(targetId(true))

export default startCommand;