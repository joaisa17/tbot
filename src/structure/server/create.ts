import {
    SlashCommandStringOption,
    SlashCommandIntegerOption,
    SlashCommandBuilder,
    PermissionFlagsBits
} from 'discord.js';

import targetId from '@utils/commandOptions/targetId';

/** Example: `/create id: testserver port: 7777` */
const create = new SlashCommandBuilder()
    .setName('create')
    .setDescription('Creates a new server')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    // id
    .addStringOption(targetId())

    // port
    .addIntegerOption(
        new SlashCommandIntegerOption()
            .setName('port')
            .setDescription('The port to host the server on')
            .setRequired(true)
            .setMinValue(1024)
            .setMaxValue(49151)
    )

    // password
    .addStringOption(
        new SlashCommandStringOption()
            .setName('password')
            .setDescription('Optional password')
    )

    // version
    .addStringOption(
        new SlashCommandStringOption()
            .setName('version')
            .setDescription(`Optional version number. Defaults to ${process.env.DEFAULT_VERSION}`)
    )

export default create;