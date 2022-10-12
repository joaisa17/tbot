import { CommandResolver } from '..';

import start from './start';
import create from './create';
import deleteCommand from './delete';

const serverCommands: CommandResolver = s => [
    start(s),
    create,
    deleteCommand(s)
];

export default serverCommands;