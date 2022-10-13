import { Command } from '@customTypes';

import startCommand from './start';
import createCommand from './create';
import deleteCommand from './delete';
import modifyCommand from './modify';
import adminCommand from './admin';

const serverCommands: Command[] = [
    createCommand,
    startCommand,
    deleteCommand,
    modifyCommand,
    adminCommand
];

export default serverCommands;