import { SlashCommandStringOption } from 'discord.js';

const targetId = (autoComplete?: boolean) => new SlashCommandStringOption()
    .setName('id')
    .setDescription('Target ID of the server')
    .setRequired(true)
    .setAutocomplete(autoComplete ?? false)

export default targetId;