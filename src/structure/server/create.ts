import {
    SlashCommandBuilder,
    PermissionFlagsBits
} from 'discord.js';

import { targetIdOption } from '@utils/commandOptions';
import addConfigOptions from '@utils/configOptions';

/** Example: `/create id: testserver port: 7777` */
const createCommand = new SlashCommandBuilder()
    .setName('create')
    .setDescription('Creates a new server')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    // id
    .addStringOption(targetIdOption(false));
    addConfigOptions(createCommand, true);

export default createCommand;