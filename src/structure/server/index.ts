import { Command } from '@customTypes';

import createCommand from './create';
import deleteCommand from './delete';

import startCommand from './start';
import stopCommand from './stop';

import modifyCommand from './modify';
import adminCommand from './admin';

const serverCommands: Command[] = [
    createCommand,
    deleteCommand,

    startCommand,
    stopCommand,
    
    modifyCommand,
    adminCommand
];

export default serverCommands;