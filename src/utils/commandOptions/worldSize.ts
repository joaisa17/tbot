import { SlashCommandIntegerOption } from 'discord.js';

const worldSizeOption = () => new SlashCommandIntegerOption()
    .setName('worldsize')
    .setDescription('Sets the world\'s size')
    .setChoices(
        { name: 'small', value: 1 },
        { name: 'medium', value: 2 },
        { name: 'large', value: 3 },
    )

export default worldSizeOption;