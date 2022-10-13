import { CommandMap } from '@customTypes';

import createServer from './create';
import startServer from './start';
import deleteServer from './delete';
import adminCommand from './admin';
import modifyCommand from './modify';

const serverCommands: CommandMap = new Map([
    ['create', createServer],
    ['start', startServer],
    ['delete', deleteServer],
    ['admin', adminCommand],
    ['modify', modifyCommand]
]);

export default serverCommands;