import { SlashCommandStringOption } from 'discord.js';

const worldSizeOption = () => new SlashCommandStringOption()
    .setName('worldsize')
    .setDescription('Sets the world\'s size')
    .setChoices(
        { name: 'small', value: 'small' },
        { name: 'medium', value: 'medium' },
        { name: 'large', value: 'large' },
    )

export default worldSizeOption;