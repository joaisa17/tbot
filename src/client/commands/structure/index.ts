import { Client, OAuth2Guild, REST, Routes, SlashCommandBuilder } from 'discord.js';

import serverCommands from './server';
import developmentCommands from './development';

import { discordServer, IDiscordServer } from '@mongoose/schemas';

export type ServerCommand = Omit<SlashCommandBuilder, "addSubcommand"|"addSubcommandGroup">;
export type CommandResolver = (s?: IDiscordServer) => ServerCommand[];

const commands: CommandResolver[] = [
    serverCommands
];
process.env.NODE_ENV === 'development' && commands.push(developmentCommands);

const rest = new REST().setToken(process.env.TOKEN as string);

export async function updateCommandStructure(guild: OAuth2Guild) {
    const server = await discordServer.findOne({ guild: guild.id });

    const commandsJson = commands.map(m => m(server || undefined).map(c =>
        c.toJSON()
    )).flat(1);

    rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID as string, guild.id),
        { body: commandsJson}
    );
}

export default async function configureCommandStructure(client: Client) {
    const guilds = await client.guilds.fetch();

    await Promise.all(guilds.map(guild => updateCommandStructure(guild)));
}