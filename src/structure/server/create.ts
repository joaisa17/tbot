import {
    SlashCommandBuilder,
    PermissionFlagsBits
} from 'discord.js';

import {
    targetIdOption,
    portOption,
    passwordOption,
    versionOption,
    difficultyOption,
    worldNameOption,
    worldSizeOption
} from '@utils/commandOptions';

/** Example: `/create id: testserver port: 7777` */
const create = new SlashCommandBuilder()
    .setName('create')
    .setDescription('Creates a new server')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    // id
    .addStringOption(targetIdOption(true))

    // port
    .addIntegerOption(portOption(true))

    // password
    .addStringOption(passwordOption())

    // version
    .addStringOption(versionOption())

    // difficulty
    .addStringOption(difficultyOption())

    // world size
    .addStringOption(worldSizeOption())

    // world name
    .addStringOption(worldNameOption())

export default create;