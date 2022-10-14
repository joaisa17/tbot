import { SlashCommandStringOption } from 'discord.js';

const passwordOption = () => new SlashCommandStringOption()
    .setName('password')
    .setDescription('Sets the server\'s password')

export default passwordOption;