import { CommandMap } from '@customTypes';

import createServer from './create';
import deleteServer from './delete';

import startServer from './start';
import stopServer from './stop';

import adminCommand from './admin';
import modifyCommand from './modify';

const serverCommands: CommandMap = new Map([
    ['create', createServer],
    ['delete', deleteServer],

    ['start', startServer],
    ['stop', stopServer],
    
    ['admin', adminCommand],
    ['modify', modifyCommand]
]);

export default serverCommands;