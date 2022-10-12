import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

const deleteSlashCommands = new SlashCommandBuilder()
    .setName('deleteslashcommands')
    .setDescription('Deletes all slash commands')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export default deleteSlashCommands;