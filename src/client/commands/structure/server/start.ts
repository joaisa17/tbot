import { IDiscordServer } from '@mongoose/schemas/discordServer';
import { SlashCommandBuilder, SlashCommandStringOption, APIApplicationCommandOptionChoice } from 'discord.js';

function start(server?: IDiscordServer) {
    const cmd = new SlashCommandBuilder()
        .setName('start')
        .setDescription('Launches the targetted server, and creates a thread for the chat')
    
    let idOption = new SlashCommandStringOption()
        .setName('id')
        .setDescription('Target ID of the server')
        .setRequired(true)
    
    if (server?.servers.length) {
        const choices: APIApplicationCommandOptionChoice<string>[] = server.servers.map(s => ({
            name: s.worldname ?? s.id,
            value: s.id
        }));

        idOption = idOption.setChoices(...choices);
    }
    
    return cmd.addStringOption(idOption);
}

export default start;