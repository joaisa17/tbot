import ITerrariaServer from './terrariaServer';

export default interface IDiscordServer {
    guildId: string;
    servers: ITerrariaServer[];
}