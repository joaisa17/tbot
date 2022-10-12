import { Awaitable, ChatInputCommandInteraction } from 'discord.js';

export type Handler = (interaction: ChatInputCommandInteraction) => Awaitable<void>;
export type CommandMap = Map<string, Handler>;

import createServer from './create';
import startServer from './start';
import deleteServer from './delete';

const serverCommands: CommandMap = new Map([
    ['create', createServer],
    ['start', startServer],
    ['delete', deleteServer]
]);

export default serverCommands;