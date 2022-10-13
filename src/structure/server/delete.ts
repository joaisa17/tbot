import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import targetId from '@utils/commandOptions/targetId';

/** Example: `/delete id: testserver` */
const deleteCommand = new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Deletes the targetted server')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    .addStringOption(targetId(true))

export default deleteCommand;