import { SlashCommandStringOption } from 'discord.js';

const motdOption = () => new SlashCommandStringOption()
    .setName('motd')
    .setDescription('Message of the day')

export default motdOption;