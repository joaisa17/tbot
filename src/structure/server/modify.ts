import { SlashCommandBuilder } from 'discord.js';

import { targetIdOption } from '@utils/commandOptions';
import addConfigOptions from '@utils/configOptions';

const modifyCommand = new SlashCommandBuilder()
    .setName('modify')
    .setDescription('Allows you to modify a server\'s configuration')

    .addStringOption(targetIdOption(true))

addConfigOptions(modifyCommand);

export default modifyCommand;