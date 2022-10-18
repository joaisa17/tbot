import { SlashCommandIntegerOption } from 'discord.js';

const difficultyOption = () => new SlashCommandIntegerOption()
    .setName('difficulty')
    .setDescription('Sets the server\'s difficulty')
    .setChoices(
        { name: 'normal', value: 0 },
        { name: 'expert', value: 1 },
        { name: 'master', value: 2 },
        { name: 'journey', value: 3 }
    )

export default difficultyOption;