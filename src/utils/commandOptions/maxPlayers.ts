import { SlashCommandIntegerOption } from 'discord.js';

const maxPlayersOption = () => new SlashCommandIntegerOption()
    .setName('maxplayers')
    .setDescription('Sets the server\'s player limit')
    .setMinValue(1)

export default maxPlayersOption;