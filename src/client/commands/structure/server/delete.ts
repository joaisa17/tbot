import { IDiscordServer } from '@mongoose/schemas/discordServer';
import { SlashCommandBuilder, SlashCommandStringOption, APIApplicationCommandOptionChoice, PermissionFlagsBits } from 'discord.js';

function deleteCommand(server?: IDiscordServer) {
    const cmd = new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Deletes the targetted server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
    
    let idOption = new SlashCommandStringOption()
        .setName('id')
        .setDescription('Target ID of the server')
        .setRequired(true);
    
    if (server?.servers.length) {
        const choices: APIApplicationCommandOptionChoice<string>[] = server.servers.map(s => ({
            name: s.worldname ?? s.id,
            value: s.id
        }));

        idOption = idOption.setChoices(...choices);
    }
    
    return cmd.addStringOption(idOption);
}

export default deleteCommand;