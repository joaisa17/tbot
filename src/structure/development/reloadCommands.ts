import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

const reloadCommands = new SlashCommandBuilder()
    .setName('reloadcommands')
    .setDescription('Reloads all slash commands')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export default reloadCommands;