import { SlashCommandIntegerOption } from 'discord.js';

const portOption = (required?: boolean) => new SlashCommandIntegerOption()
    .setName('port')
    .setDescription('The port to host the server on')
    .setRequired(required ?? false)
    .setMinValue(1024)
    .setMaxValue(49151);

export default portOption;