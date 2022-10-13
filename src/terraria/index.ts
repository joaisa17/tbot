import { ITerrariaServer } from '@mongoose/schemas/discordServer';

import loadConfig from './config';
import Terminal from './terminal';

export const terminals: Record<string, Record<string, Terminal>> = {};

export default async function configureServer(config: ITerrariaServer, guildId: string) {
    await loadConfig(config);

    const term = new Terminal(config);

    terminals[guildId] ??= {};
    terminals[guildId][config.id] = term;

    return term;
}

export { Terminal }