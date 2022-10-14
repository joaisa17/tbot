import { SlashCommandUserOption } from 'discord.js';

const targetUserOption = (required?: boolean) => new SlashCommandUserOption()
    .setName('user')
    .setDescription('The target user')
    .setRequired(required ?? false)

export default targetUserOption