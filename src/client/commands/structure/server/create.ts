import {
    SlashCommandStringOption,
    SlashCommandIntegerOption,
    SlashCommandBuilder,
    PermissionFlagsBits
} from 'discord.js';
    
const create = new SlashCommandBuilder()
    .setName('create')
    .setDescription('Creates a new server')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    // id
    .addStringOption(
        new SlashCommandStringOption()
            .setName('id')
            .setDescription('The alias used to reference the server')
            .setRequired(true)
    )

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
            .setDescription(`Optional version number. Currently defaults to ${process.env.DEFAULT_VERSION}`)
    )

export default create;