import { SlashCommandStringOption } from 'discord.js';

const worldNameOption = () => new SlashCommandStringOption()
    .setName('worldname')
    .setDescription('Sets the world\'s name')

export default worldNameOption;