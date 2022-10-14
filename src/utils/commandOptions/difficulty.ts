import { SlashCommandStringOption } from 'discord.js';

const difficultyOption = () => new SlashCommandStringOption()
    .setName('difficulty')
    .setDescription('Sets the server\'s difficulty')
    .setChoices(
        { name: 'normal', value: 'normal' },
        { name: 'expert', value: 'expert' },
        { name: 'master', value: 'master' },
        { name: 'journey', value: 'journey' }
    )

export default difficultyOption;