import { SlashCommandBuilder } from 'discord.js';
import {
    portOption,
    worldSizeOption,
    worldNameOption,
    difficultyOption,
    maxPlayersOption,
    passwordOption,
    motdOption
} from './commandOptions';

export default function addConfigOptions(builder: Omit<SlashCommandBuilder, 'addSubcommand'|'addSubcommandGroup'>, requirePort?: boolean) {
    return builder
        .addIntegerOption(portOption(requirePort))

        .addIntegerOption(worldSizeOption())
        .addStringOption(worldNameOption())

        .addIntegerOption(difficultyOption())
        .addIntegerOption(maxPlayersOption())

        .addStringOption(passwordOption())
        .addStringOption(motdOption());
}