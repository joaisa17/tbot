import { SlashCommandStringOption } from 'discord.js';

const targetIdOption = (autocomplete?: boolean) => new SlashCommandStringOption()
    .setName('id')
    .setDescription('Target ID of the server')
    .setRequired(true)
    .setAutocomplete(autocomplete ?? false)

export default targetIdOption;