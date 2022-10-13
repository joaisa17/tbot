import { CommandMap } from '@customTypes/commands';

import reloadCommands from './reloadCommands';

const developmentCommands: CommandMap = new Map([
    ['reloadcommands', reloadCommands]
]);

export default developmentCommands;